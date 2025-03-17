import { Deck } from "./deck.js";

export class Game {
  constructor() {
    this.deck = new Deck();
    const { stock, piles } = this.deck.solitaireArrangement();
    this.stock = stock;
    this.piles = piles;
    this.foundations = [[], [], [], []];
  }

  hasWon() {
    return false;
  }

  data() {
    const { piles, foundations, stock } = this;
    return { piles, foundations, stock };
  }

  turnCard(pile) {
    if (pile.closed.length === 0) return;
    pile.opened = [pile.closed.shift()];
  }

  pileToPile(from, to, index) {
    const fromPile = this.piles[from - 1];
    const deleteCount = fromPile.opened.length + fromPile.closed.length - index;
    const swappingCards = fromPile.opened.splice(0, deleteCount);
    const toPile = this.piles[to - 1];
    toPile.opened = swappingCards.concat(toPile.opened);
    if (fromPile.opened.length === 0) this.turnCard(fromPile);
  }

  takeCardFromStock() {}
  placeCardInFoundation() {}
  placeCardInPile() {}
  result() {}
}
