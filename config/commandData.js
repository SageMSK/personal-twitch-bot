'use strict';

const moment = require('moment');

const commandList = {
  banme: "You want SOME OF THIS BAN HAMMER?! DON'T TEST ME BRUH!",
  currentTime: `It is currently, ${moment().format('LT')} EST for Sage.`,
  schedule: "Stream will always start at time.start to time.end on every Thursday, Friday, Saturday and Sunday.",
  twitterInfo: "Sage's twitter is https://twitter.com/sagemonkeys",
  hello: 'hello world!'
};

module.exports = commandList;
