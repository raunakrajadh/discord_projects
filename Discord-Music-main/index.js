const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_INVITES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'GUILD_VOICE_STATES',
        'GUILD_WEBHOOKS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING',
        // 'GUILD_MEMBERS',
        // 'GUILD_PRESENCES'
    ],
    partials: ['CHANNEL']
});

const config = require('./config.json')
let prefix = process.env.prefix || config.prefix


const { Player } = require('discord-music-player')
const player = new Player(client, { leaveOnEmpty: false, leaveOnStop: true, volume: 100, leaveOnEnd: false })
client.player = player


function setStatus(){
    client.user.setActivity('music in ' + client.guilds.cache.size + ' guilds!', {type: 'PLAYING'})
}


client.on('ready' , () =>{
    console.log('this bot is online!');
    setStatus()
})
client.on('guildCreate', () => {
    setStatus()
})
client.on('guildDelete', () => {
    setStatus()
})


client.player
.on('songFirst', (queue, song) => {
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription('Now playing [' + song.name + '](' + song.url + ')')
        .setFooter('Requested by ' + queue.data.requesterTag)
    queue.data.message.channel.send({embeds: [embed]})
})
.on('songAdd', (queue, song) => {
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription('Added [' + song.name + '](' + song.url + ') to queue!')
        .setFooter('Requested by ' + queue.data.requesterTag)
    queue.data.message.channel.send({embeds: [embed]})
})
.on('songChanged', (queue, newSong, oldSong) => {
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription('Next song now playing [' + newSong.name + '](' + newSong.url + ')')
        .setFooter('Requested by ' + queue.data.requesterTag)
    queue.data.message.channel.send({embeds: [embed]})
})
.on('channelEmpty', (queue) => {
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('Everyone left the voice channel so I left!')
    queue.data.message.channel.send({embeds: [embed]})
})
.on('clientDisconnect', (queue) => {
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('I got disconnected from voice channel')
    queue.data.message.channel.send({embeds: [embed]})
})
.on('queueEnd',  (queue) => {
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('Queue ended!')
    queue.data.message.channel.send({embeds: [embed]})
})
.on('error', (error, queue) => {
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription('An error occured!')
    queue.data.message.channel.send({embeds: [embed]})
});


client.on('messageCreate', async (message) => {

    if(message.content == config.prefix + 'help'){

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('Commands:\n' + '`play`, `playlist`, `skip`, `stop`, `removeLoop`, `toggleLoop`, `toggleQueueLoop`, `setVolume`, `seek`, `clearQueue`, `shuffle`, `nowPlaying`, `pause`, `resume`, `remove`')
        message.channel.send({embeds: [helpEmbed]})
    }

    let args = message.content.substring(prefix.length).split(' ')
    let guildQueue = client.player.getQueue(message.guild.id);
    if(!message.content.startsWith(config.prefix)) return;

    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription('You need to be in a voice channel!')

        return message.channel.send({embeds: [embed]})
    }

    switch(args[0]){

        case 'play':
            if(!args.slice(1).join(' ')){
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('Nothing to play!')
    
                return message.channel.send({embeds: [embed]})
            }
    
            const playEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('Searching `' + args.slice(1).join(' ') + '`')
    
            message.channel.send({embeds: [playEmbed]})

            let playQueue = client.player.createQueue(message.guild.id, {data: {message: message, requesterTag: message.author.tag}});
            await playQueue.join(message.member.voice.channel);
            await playQueue.play(args.slice(1).join(' ')).catch((err) => {
                if(!guildQueue){
                    playQueue.stop();
                }
                console.log(err)
            });
        break;

        case 'playlist':
            if(!args.slice(1).join(' ')){
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('Nothing to play!')
    
                return message.channel.send({embeds: [embed]})
            }
    
            const playlistEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('Searching `' + args.slice(1).join(' ') + '`')
    
            message.channel.send({embeds: [playlistEmbed]})

            let playlistQueue = client.player.createQueue(message.guild.id, {data: {message: message, requesterTag: message.author.tag}});
            await playlistQueue.join(message.member.voice.channel);
            await playlistQueue.playlist(args.slice(1).join(' ')).catch((err) => {
                if(!guildQueue){
                    playlistQueue.stop();
                }
                console.log(err)
            });
        break;

        case 'skip':
            guildQueue.skip();
        break;

        case 'stop':
            guildQueue.stop();
        break;

        case 'removeLoop':
            guildQueue.setRepeatMode(0)
        break;

        case 'toogleLoop':
            guildQueue.setRepeatMode(1)
        break;

        case 'toggleQueueLoop':
            guildQueue.setRepeatMode(2)
        break;

        case 'setVolume':
            guildQueue.setVolume(parseInt(args[0]));
        break;

        case 'seek':
            guildQueue.seek(parseInt(args.slice(1).join(' ')) * 1000);
        break;

        case 'clearQueue':
            guildQueue.clearQueue();
        break;

        case 'shuffle':
            guildQueue.shuffle();
        break;

        case 'nowPlaying':
            console.log(`Now playing: ${guildQueue.nowPlaying}`);
        break;

        case 'pause':
            guildQueue.setPaused(true);
        break;

        case 'resume':
            guildQueue.setPaused(false);
        break;

        case 'remove':
            guildQueue.remove(parseInt(args.slice(1).join(' ')));
        break;

    }

})


let token = process.env.Token || config.token
client.login(token);