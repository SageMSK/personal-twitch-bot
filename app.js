'use strict';

const tmi = require('tmi.js'),
      dice = require('./games/dice'),
      roulette = require('./games/russianRoulette'),
      botName = require('./config/botUser'),
      info = require('./config/commandData');

const options = {
  options: {
    debug: true
  },
  connection: {
    cluster: 'aws',
    reconnect: true
  },
  identity: {
    username: botName.name, // twitch account you want to use as a client bot
    password: botName.apikey
  },
  channels: ['sagemonkey']
};

const client = new tmi.client(options);
client.connect();
client.on('connected', (address, port) => {
  console.log(`Address: ${address} Port: ${port}`);
  client.action("sagemonkey", "Client bot turning on.");
});

// Fun commands
client.on('chat', (channel, user, message, self) => {
  switch (message) {
    case "!banmebitch":
      client.say('sagemonkey', `${user['display-name']}, ${info.banme}`);
      break;

    case "!bot":
      client.say('sagemonkey', `Hey ${user['display-name']}, ${botName.info}`);
      break;

    case "!commands":
      let allCommands = Object.keys(info);
      client.say('sagemonkey', `Hey ${user['display-name']}, Here are some useful commands: ${allCommands}`);
      break;

    case "!dice":
      client.say('sagemonkey', `You roll a dice and it landed at ${dice()}.`);
      break;

    case "!roulette":
      let faith = roulette();
      client.say('sagemonkey', `The revolver triggers. ${faith ? `BANG! RIP ${user['display-name']}`:"CLICK! It's a prank! Kappa It's just a prank bro."}`);
      client.timeout('sagemonkey', user, 5);
      break;

    case "!slapme":
      client.say('sagemonkey', `Slaps ${user['display-name']} with a huge donger Kreygasm`);
      break;

    case "!time":
      client.say('sagemonkey', `Hey ${user['display-name']}, ${info.currentTime}`);
      break;

    case "!twitter":
      client.say('sagemonkey', `Hey ${user['display-name']}, ${info.twitterInfo}`);
      break;

    case "!schedule":
      client.say('sagemonkey', `${info.schedule}`);
      break;
  };
});


// Strict Chat Mode
client.on('chat', (channel, user, message, self) => {
  if (message === '!strictmode') {
    // if broadcaster has partnership
    // client.subscribers("sagemonkey");
    client.r9kbeta('sagemonkey').then(() => {
      client.slow('sagemonkey', 10);
    });
  }
  if (message === '!strictmode off') {
    // if broadcaster has partnership
    // client.subscribersoff("sagemonkey");

    client.r9kbetaoff('sagemonkey').then(() => {
      client.slowoff('sagemonkey');
    });
  }
});

// For future events, when broadcaster receives twitch partnership
client.on('subscription', (channel, username) => {
  client.say('sagemonkey', `Kreygasm WELCOME ${username['display-name']} to the sub club! Kreygasm`);
});

client.on('subanniversary', (channel, username, months) => {
  client.action('sagemonkey', `Hey ${username['display-name']}, Thanks for being a subscriber for ${months} months!`);
});
