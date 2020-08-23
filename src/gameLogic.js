import { suits, values } from './deck.js';

export function getValue(value) {
  const valueMap = {
    "K": -1,
    "A": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 10,
    "Q": 10,
  };

  return valueMap[value];
}

function sum(arr) {
  if (arr.length < 1) {
    return 0;
  } else {
    return arr.reduce((acc, val) => acc + val);
  }
}

export function score(hand) {
  const vals = hand.map(card => getValue(card[0]));

  // check for outer 4 matches
  if (vals[0] === vals[2] &&
      vals[0] === vals[3] &&
      vals[0] === vals[5]) {
    const middleVals = [vals[1], vals[4]];
    return sum(middleVals) - 20;
  }

  // check for adjacent 4 matches
  if (vals[0] == vals[3] &&
      vals[1] == vals[4]) {
    const rightVals = [vals[2], vals[5]];
    return sum(rightVals) - 10;
  }

  if (vals[1] == vals[4] &&
      vals[2] == vals[5]) {
    const leftVals = [vals[0], vals[3]];
    return sum(leftVals) - 10;
  }

  // check for vertical matches
  if (vals[0] === vals[3]) {
    return sum([vals[1], vals[2], vals[4], vals[5]]);
  } else if (vals[1] === vals[4]) {
    return sum([vals[0], vals[2], vals[3], vals[5]]);
  } else if (vals[2] === vals[5]) {
    return sum([vals[0], vals[1], vals[3], vals[4]]);
  }

  // nothing found, return the sum of all cards
  return sum(vals);
}
