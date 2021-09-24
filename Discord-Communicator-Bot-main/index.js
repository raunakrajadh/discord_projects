const Discord = require('discord.js');
const client = new Discord.Client();
const { botname, botdeveloper, thumbnailurl, botinvite, supportserver, PREFIX, token } = require('./config.json')

global.XMLHttpRequest = require("xhr2");

client.on('ready', () => {
        console.log('Hurray!! ' + botname + ' is Online!')
        client.user.setActivity(PREFIX + 'help', { type: 'PLAYING'}).catch(console.error);
})

client.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    if(message.content.startsWith(PREFIX)) {
        
    switch (args[0]) {

        case 'help':
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: botname + ' - ' + PREFIX + 'help',
                    description: "Hi! I am a Utility Bot 🤖",
                    thumbnail: {
                        url: thumbnailurl,
                    },
                    fields: [{
                            name: '⁣',
                            value:
                                
                            '\n **__📝 User Commands 📝__**\n' +

                            '\n`' + PREFIX + 'help`: This!' +
                            '\n`' + PREFIX + 'info`: Get some info!' +
                            '\n`' + PREFIX + 'send`: Send message to a target channel!' +

                            '\n'                      
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: botname,
                    }
                }
            });
        break;

        case 'info':

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        
                message.channel.send({
                    embed: {
                        color: 3447003,
                        thumbnail: {
                            url: thumbnailurl,
                        },
                        fields: [{
                                name: 'Developer',
                                value: botname + ' is developed by ' + botdeveloper
                            },
                            {
                                name: 'Invite',
                                value: "[Invite me to your server](" + botinvite + ")"
                            },
                            {
                                name:'Servers',
                                value: 'Used in ' + client.guilds.cache.size + ' Servers'
                            },
                            {
                                name: 'Support',
                                value: "[Join our support server](" + supportserver + ")"
                            },
                            {
                                name: 'Uptime',
                                value: "Uptime: " + uptime 
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: botname
                        }
                    }
            });
        break;

        case 'send':

        if(!args[1]){

            message.channel.send({
                embed: {
                    color: 3447003,
                    title: 'Command: ' + PREFIX + 'send',
                    description: "Send message to any channel of any server by id!",
                    thumbnail: {
                        url: thumbnailurl,
                    },
                    fields: [{
                            name: '⁣',
                            value:

                            '\n **Usage:** \n' + PREFIX + 'send [[Channel ID](https://media.discordapp.net/attachments/776734920130691082/776735976382922762/unknown.png?width=638&height=559)] [Message]' +

                            '\n' +

                            '\n **Example:** \n' + PREFIX + 'send 776380327144325130 Hello!'
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: botname,
                    }
                }
            });
            
        }
        else{
            
            if(!args[2]){
                message.channel.send('Cannot send an empty message!')
            }
            else{

                client.guilds.cache.forEach(async guild => {

                    const target_channel = await guild.channels.cache.get(args[1]);
                    const webhooks = await target_channel.fetchWebhooks();
                    const target_webhook = await webhooks.first();

                    const error_tryagain = '```Couldnot send your message\nWebhook not found on target channel\nI have successfully create a webhook\nPlease Try again```\n\n```Target Channel ID: ' + args[1] + '\nYour Message: ' + args.slice(2).join(' ') + '```';

                    message.delete();

                        var webhook_data = {
                            username: botname,
                            avatar_url: thumbnailurl,
                        }

                        await target_channel.fetchWebhooks()
                        .then((success) =>
                            target_webhook.send('**Message from** __' + message.author.tag + '__\n\n' + args.slice(2).join(' '), webhook_data)
                            .then(message.channel.send("Message successfully sent!", console.log(success)))
                        )
                        .catch(error => target_channel.createWebhook(botname, {avatar: thumbnailurl,}, message.channel.send(error_tryagain, console.log(error))))
                });
            }
        }
        break;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
}
})

client.login(token);