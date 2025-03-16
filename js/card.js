export class Card {
  constructor(suit, type, value, acronym, color) {
    this.suit = suit;
    this.type = type;
    this.value = value;
    this.acronym = acronym;
    this.color = color;
  }

  toString() {
    return this.acronym;
  }
}
