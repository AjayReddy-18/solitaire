import { Deck } from "./deck.js";

export class Game {
  constructor() {
    this.deck = new Deck();
    const { stock, piles } = this.deck.solitaireArrangement();
    this.stock = stock;
    this.piles = piles;
    this.foundations = [[], [], [], []];
  }

  start() {
    const { piles, foundations, stock } = this;
    return { piles, foundations, stock };
  }

  takeCardFromStock() {}
  placeCardInFoundation() {}
  placeCardInPile() {}
  result() {}
}
