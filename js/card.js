export class Card {
  constructor(suit, type, value, acronym) {
    this.suit = suit;
    this.type = type;
    this.value = value;
    this.acronym = acronym;
  }

  toString() {
    return this.acronym;
  }
}
