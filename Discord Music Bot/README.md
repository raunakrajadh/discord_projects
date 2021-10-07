# Music Bot

Basic music bot with discord.js v13. Uses <a href="https://discord-music-player.js.org/">Discord Music Player</a>

## How to configure the bot?

1. Setup/ Install the dependencies 

Open terminal, navigate to your folder and run the following!
```
npm init
npm install
npm install discord.js@13.2.0
npm install discord-music-player
npm install opusscript
```

2. Configuration

<ul>
    <li>Go to <a href="https://discord.com/developers/applications">Discord Developer Portal</a> and create a new application!</li>
    <li>Go to bots and setup a new bot!</li>
    <li>Copy the bot token</li>
    <li>Go to your code, open `./config.json` and paste the token there</li>
    <li>Also fill all other things in the config file!</li>
</ul>

3. Startup

To get your bot online, run;
```
node index.js
```
