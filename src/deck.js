export const suits = ["H", "S", "C", "D"];
export const values = ["A", "2", "3", "4", "5", "6", "7",
		       "8", "9", "T", "J", "Q", "K"];

export class Deck {
  constructor() {
    this.deck = [];
    this.dealtCards = [];

    this.reset();
    this.shuffle();
  }

  shuffle() {
    // Fisher-Yates Shuffle, credit to Mike Bostock for js implementation
    const deck = this.deck;
    let m = deck.length;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  deal(numCards) {
    const cards = this.deck.slice(0, numCards);
    this.deck = this.deck.slice(numCards);
    this.dealtCards.push(...cards);

    return cards;
  }

  reset() {
    this.deck = [];
    this.dealtCards = [];

    for (const suit of suits) {
      for (const value of values) {
	this.deck.push(`${value}${suit}`);
      }
    }
  }
}
