import { Card } from "./card.js";

export class Suit {
  constructor(type, color) {
    this.type = type;
    this.color = color;
    this.createCards();
  }

  createCards() {
    this.cards = cardInstances(this.type, this.color);
  }
}

const cards = {
  king: { value: 13, type: "face", acronym: "K" },
  queen: { value: 12, type: "face", acronym: "Q" },
  jack: { value: 11, type: "face", acronym: "J" },
  ten: { value: 10, type: "number", acronym: "10" },
  nine: { value: 9, type: "number", acronym: "9" },
  eight: { value: 8, type: "number", acronym: "8" },
  seven: { value: 7, type: "number", acronym: "7" },
  six: { value: 6, type: "number", acronym: "6" },
  five: { value: 5, type: "number", acronym: "5" },
  four: { value: 4, type: "number", acronym: "4" },
  three: { value: 3, type: "number", acronym: "3" },
  two: { value: 2, type: "number", acronym: "2" },
  ace: { value: 1, type: "number", acronym: "A" },
};

const cardInstances = (suit, color) => {
  return Object.keys(cards).reduce((instances, card) => {
    const { type, value, acronym } = cards[card];
    instances[card] = new Card(suit, type, value, suit[0] + acronym, color);
    return instances;
  }, {});
};
