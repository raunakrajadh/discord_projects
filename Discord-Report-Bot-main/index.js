const Discord = require('discord.js');
const client = new Discord.Client();
const { botname, PREFIX, thumbnailurl } = require('./config.json')

global.XMLHttpRequest = require("xhr2");

client.on('ready', () => {
    console.log('Hurray!! ' + botname + ' is Online!')
    client.user.setActivity(PREFIX +'help', { type: 'LISTENING'}).catch(console.error);
})

client.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    
    if(message.content == PREFIX + 'help') {
        message.channel.send({
                    embed: {
                        color: 3447003,
                        title: botname + ' - ' + PREFIX + 'help',
                        description: "Please read it carefully!! \n⁣",
                        thumbnail: {
                            url: thumbnailurl,
                        },
                        fields: [{
                                name: '**__Format of typing a report:__**',
                                value:
       
                                '⁣\n`' + PREFIX + "report -w` __Webhook URL__ `-r` __Type your report__\n" +
                                "\n`-w` Target Webhook!" +
                                "\n`-r` Your report!",

                                inline: false,
                                },
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: botname,
                        }
                    }
                });
    }

    if(message.content.startsWith(PREFIX)) {
        
    switch (args[0]) {
        case 'report':

            if(args[1] == '-w'){

                if(args[3] == '-r'){

                    var request = new XMLHttpRequest();
                    request.open("POST", args[2] );
                    request.setRequestHeader('Content-type', 'application/json');

                    var params = {
                        username: "Report",
                        avatar_url: "https://discordtemplates.me/static/img/icon.png",
                
                    
                            "embeds": [{
                                "title": "**__A new report!__**",
                                "color": 3447003,

                            "thumbnail": {
                                    "url": "https://discordtemplates.me/static/img/icon.png",
                            },

                            "fields": [
                            {
                                "name": "⁣\n**__User Info:__**",

                                "value": "⁣\n__Username:__ " + message.author.tag + "\n__ID:__ " + message.author.id + "\n⁣",
                                "inline": false,
                            },
                            {
                                "name": "**__Report:__**",

                                "value": "⁣\n__Report:__ " + args.slice(4).join(' '),
                                "inline": false,
                            },
                            ],

                            "timestamp": new Date(),

                            }]
                        }

                    request.send(JSON.stringify(params));

                message.channel.send("Your report was successfully sent!")

                }
                else {
                    message.channel.send("You typed `" + args[3] + "` instead of `-r` Please type `" + PREFIX + "help` for more info!")
                }
            }
            else {
                message.channel.send("You typed `" + args[1] + "` instead of `-w` Please type `" + PREFIX + "help` for more info!")
            }

        break;
    }
    }

})

client.login(config.token);