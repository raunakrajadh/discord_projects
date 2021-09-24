const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

const {botname, PREFIX, thumbnailurl, token } = require('./config.json')

let quiz_type_api_link;
const { quiz_science_computer, quiz_general, quiz_sports, quiz_anime, quiz_random } = require('./config.json')


client.on('ready', () => {
    console.log('Hurray!! ' + botname + ' is Online!')
})

client.on('message', async message => {

    let args = message.content.toLowerCase().substring(PREFIX.length).split(" ");    
    if(message.content.toLowerCase().startsWith(PREFIX)){

    switch(args[0]){

        case 'quiz':
            async function quiz(){

                let response = await fetch(quiz_type_api_link);
                const data = await response.json();
                var length = data.results.length;
                var randomNumber = Math.floor(Math.random() * length);
                var randomQuestion = data.results[randomNumber];
                var question = randomQuestion.question;
                var correctAnswer = randomQuestion.correct_answer;

                if(correctAnswer == 'True'){
                    correctAnswer = '✅'
                }
                else if(correctAnswer == 'False'){
                    correctAnswer = '❌'
                }

                const quiz_embed = new Discord.MessageEmbed()

                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor('BLUE')
                    .addFields(
                        {
                            name: 'Question',
                            value: question,
                            inline: false,
                        },
                        {
                            name: 'Result',
                            value: 'Waiting for reaction...',
                            inline: false,
                        }
                    )
                    .setTimestamp()
                    .setFooter(botname)

                message.channel.send(quiz_embed)

                .then((q_message) => {
                    q_message.react('✅').then(q_message.react('❌'))

                    const filter = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                    }

                    q_message.awaitReactions(filter, { max: 1, time: 60000, error: ["time"] }).then(
                    async (collected) => {
                        const reaction = collected.first()

                        if(reaction.emoji.name == '✅' && correctAnswer == '✅'){
                             const quiz_won_embed = new Discord.MessageEmbed()

                                .setColor('GREEN')
                                .setAuthor( message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '✅ Yey you got the correct answer!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(botname);

                            q_message.edit(quiz_won_embed)
                        }
                        else if(reaction.emoji.name == '❌' && correctAnswer == '❌'){
                             const quiz_won_embed = new Discord.MessageEmbed()

                                .setColor('GREEN')
                                .setAuthor( message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '✅ Yey you got the correct answer!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(botname);

                            q_message.edit(quiz_won_embed)
                        }
                        else if(reaction.emoji.name == '✅' && correctAnswer == '❌'){
                             const quiz_won_embed = new Discord.MessageEmbed()

                                .setColor('RED')
                                .setAuthor( message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '❌ No you got the wrong answer!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(botname);

                            q_message.edit(quiz_won_embed)
                        }
                        else if(reaction.emoji.name == '❌' && correctAnswer == '✅'){
                             const quiz_won_embed = new Discord.MessageEmbed()

                                .setColor('RED')
                                .setAuthor( message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '❌ No you got the wrong answer!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(botname);

                            q_message.edit(quiz_won_embed)
                        }
                    })
                    .catch(collected => {

                        const no_response = new Discord.MessageEmbed()

                            .setColor('RED')
                            .setAuthor( message.author.tag, message.author.displayAvatarURL())
                            .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '❌ Quiz has been cancelled since you did not reposnd in time!',
                                        inline: false,
                                    }
                                )
                            .setTimestamp()
                            .setFooter(botname);

                        q_message.edit(no_response)
                        .then(() => {
                        q_message.reactions.removeAll();
                        });
                    })
                })
            }

            if(!args[1]){
                
                const quiz_type_embed = new Discord.MessageEmbed()

                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor('RANDOM')
                    .setThumbnail(thumbnailurl)
                    .addFields(
                        {
                            name: '__Quiz__ - General Knowledge',
                            value: PREFIX + 'quiz 1',
                            inline: false,
                        },
                        {
                            name: '__Quiz__ - Science & Computer',
                            value: PREFIX + 'quiz 2',
                            inline: false,
                        },
                        {
                            name: '__Quiz__ - Anime',
                            value: PREFIX + 'quiz 3',
                            inline: false,
                        },
                        {
                            name: '__Quiz__ - Sports',
                            value: PREFIX + 'quiz 4',
                            inline: false,
                        },
                        {
                            name: '__Quiz__ - Random Question',
                            value: PREFIX + 'quiz 5',
                            inline: false,
                        },
                    )
                    .setTimestamp()
                    .setFooter(botname)

                message.channel.send(quiz_type_embed);
            }
            else{
                if(args[1] == '1'){
                    quiz_type_api_link = quiz_general
                    quiz()
                }
                else if(args[1] == '2'){
                    quiz_type_api_link = quiz_science_computer
                    quiz()
                }
                else if(args[1] == '3'){
                    quiz_type_api_link = quiz_anime
                    quiz()
                }
                else if(args[1] == '4'){
                    quiz_type_api_link = quiz_sports
                    quiz()
                }
                else if(args[1] == '5'){
                    quiz_type_api_link = quiz_random
                    quiz()
                }

            }            
        break;
    }
    }
})

client.login(token);