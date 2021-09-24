# RPS Bot

RPS Bot is a Discord Bot created with Discord Api <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a>

It interacts with user to play rock, paper, scissor

<li> How does it work?</li>
<li> What are the commands?</li>
<li> How to configure the bot?</li>

## How Does it work?

The bot, when you run the command, sends an embed and reacts with 3 emojis [🧱, 📰, ✂], and asks the user to react with one, while bot itself choses one of 3 random eomjis, then the bot analyzes the reaction and replies with who won the game!

## What are the commands?

There is 1 main command

1. `${PREFIX}rps`

**`${PREFIX}rps`**

The main command of the bot that starts the game!

## How to configure the bot?

1. Setup/ Install the dependencies 

Open terminal, navigate to your folder and run the following!
```
npm init
npm install discord.js@12.5.3
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
