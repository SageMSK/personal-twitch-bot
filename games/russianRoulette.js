'use strict';

const russianRoulette = () => {
  let kill = Math.floor(6 * Math.random()) + 1;
  let randomNum = Math.floor(6 * Math.random()) + 1;
  if (kill === randomNum) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = russianRoulette;
