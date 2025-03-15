import { Suit } from "./suit.js";

export class Deck {
  constructor() {
    this.spades = new Suit("SPADES");
    this.hearts = new Suit("HEARTS");
    this.clubs = new Suit("Clubs");
    this.diamonds = new Suit("Diamonds");
  }
}
