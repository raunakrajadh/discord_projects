const RPC = require('discord-rpc');
const rpc = new RPC.Client({transport: 'ipc'})

const config = require('./config.json')

rpc.on('ready', () => {

    rpc.setActivity({
        details: config.details,
        state: config.state,
        startTimestamp: new Date(),
        largeImageKey: config.largeImageKey,
        largeImageText: config.largeImageText,
    })
    console.log("Rich presence set!")
});

rpc.login({ clientId: config.botId })
