# Report Bot

Report Bot is a Discord Bot created with Discord Api <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a>

It sends message to a target webhook!

<li> How does it work?</li>
<li> What are the commands?</li>
<li> How to configure the bot?</li>

## How Does it work?

The bot, when you run the command, collect the message you typed and sends it to the target webhook!

## What are the commands?

There are 2 main commands!

1. `${PREFIX}help`
3. `${PREFIX}report`

**`${PREFIX}help`**

A simple command that replies with a help embed show the format of sending message to the webhook


**`${PREFIX}report`**

The main command of the bot that send message to the target webhooks!

## How to configure the bot?

1. Setup/ Install the dependencies 

Open terminal, navigate to your folder and run the following!
```
npm init
npm install discord.js@12.5.3
npm install xhr2
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
