const Discord = require('discord.js');
const client = new Discord.Client();

const sounds = {'bark': 'bark.mp3', 'triple': 'triple.mp3', 'tasty':'tasty1.mp3', 'coffin':'coffindance.mp3', 'crab':'crab_rave.mp3'}

client.once('ready', () => {
	console.log('Ready!');
});

async function playSound(message, sound){
    const connection = await message.member.voice.channel.join()
    const dispatcher = connection.play(sounds[sound]);

    dispatcher.on('start', () => {
        //console.log('bark.mp3 is now playing!');
    });

    dispatcher.on('finish', () => {
        //console.log('bark.mp3 has finished playing!');
        message.member.voice.channel.leave();
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
}

client.on('message', message => {
    if(message.author.bot) return;
    //if(message.channel.id === "722964503557570631"){}
        let soundList = "";
        if (message.content.startsWith("--sounds")) {
            Object.keys(sounds).forEach(element => {
                soundList += "**(**" + element + "**)** ";
            });
            message.channel.send(soundList);
            //console.log(soundList);
        }
        else if(message.content.startsWith("--")){
            let msg = message.content.trim();
            let command = msg.substring(msg.indexOf("--")+2);
            if(command in sounds){
                if (message.member.voice.channel){
                    playSound(message, command);
                }
                else{
                    message.channel.send("Join a voice channel to use me.")
                }
            }
            else(
                message.channel.send(command + " is not in my library. Use '--sounds' to see which sounds are.")
            )
        }
    
});

client.login('############);
