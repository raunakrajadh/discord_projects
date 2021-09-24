# The Communicator

The Communicator is a Discord Bot created with Discord Api <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a>

It sends message from one server to another

<li> How does it work?</li>
<li> What are the commands?</li>
<li> How to configure the bot?</li>

## How Does it work?

The bot, when you run the command, search for webhooks present in the target channel!

<li>If webhook is not found!</li>

1. It create a webhook in the target channel!
2. Send you and error message saying (Webhook not found!)
3. Ask you to run the command again!


<li>If webhook is found!</li>

1. The bot collects the message sent by you!
2. It send your message to the target!

## What are the commands?

There are 3 main commands!

1. `${PREFIX}help`
2. `${PREFIX}info`
3. `${PREFIX}send`

**`${PREFIX}help`**

A simple command that replies with a help embed show all 3 different commands!

**`${PREFIX}info`**

A command that displays the name of Bot developer, Bot invite link, Servers the bot is in, Link to support server and bot uptime!

**`${PREFIX}send`**

The main command of the bot that send message through webhooks!

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
