# Quiz Bot

Quiz Bot is a Discord Bot created with Discord Api <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a>

It interacts with user, asking different quiz question of different categories!

<li> How does it work?</li>
<li> What are the commands?</li>
<li> How to configure the bot?</li>

## How Does it work?

The bot, when you run the command, redirects to <a href="https://opentdb.com"> Opentdb Api </a>, and fetch questions and lets the user react with [✅, ❌], where the bot check if the reaction/answer is correct or not!

## What are the commands?

**Main Command**

1. `${PREFIX}quiz`

**Sub Commands**

1. `${PREFIX}quiz 1`
2. `${PREFIX}quiz 2`
3. `${PREFIX}quiz 3`
4. `${PREFIX}quiz 4`
5. `${PREFIX}quiz 5`


**`${PREFIX}quiz`**

The help type command of the bot that displays all the available sub-commands for quiz!

**`${PREFIX}quiz 1`**

The main command of the bot that fetch the questions on category __General Knowledge__!

**`${PREFIX}quiz 2`**

The main command of the bot that fetch the questions on category __Science & Computer__!

**`${PREFIX}quiz 3`**

The main command of the bot that fetch the questions on category __Anime__!

**`${PREFIX}quiz 4`**

The main command of the bot that fetch the questions on category __Sports__!

**`${PREFIX}quiz 5`**

The main command of the bot that fetch the questions on __random__ categories!

## How to configure the bot?

1. Setup/ Install the dependencies 

Open terminal, navigate to your folder and run the following!
```
npm init
npm install discord.js@12.5.3
npm install node-fetch
```

2. Configuration

<ul>
    <li>Go to <a href="https://discord.com/developers/applications">Discord Developer Portal</a> and create a new application!</li>
    <li>Go to bots and setup a new bot!</li>
    <li>Copy the bot token</li>
    <li>Go to your code, open `./config.json` and paste the token there</li>
    <li>Also fill all other things in the config file!</li>
</ul>

⚠ Remember not to make any changes on opentdb api links!

3. Startup

To get your bot online, run;
```
node index.js
```
