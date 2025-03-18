import { Deck } from "./deck.js";

export class Game {
  constructor() {
    this.deck = new Deck();
    const { stock, piles } = this.deck.solitaireArrangement();
    this.stock = stock;
    this.piles = piles;
    this.foundations = [
      [{ value: 0, type: "SPADES" }],
      [{ value: 0, type: "HEARTS" }],
      [{ value: 0, type: "CLUBS" }],
      [{ value: 0, type: "DIAMONDS" }],
    ];
    this.moves = 0;
  }

  incrementMoves() {
    this.moves++;
  }

  hasWon() {
    return this.moves === 4;
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

  pileToFoundation(from, to) {
    const fromPile = this.piles[from - 1];
    const foundation = this.foundations[to - 1];

    foundation.unshift(fromPile.opened.shift());
    if (fromPile.opened.length === 0) this.turnCard(fromPile);
  }

  turnCardFromStock() {
    this.stock.opened.unshift(this.stock.closed.pop());
  }

  stockToPile(to) {
    const toPile = this.piles[to - 1];

    toPile.opened.unshift(this.stock.opened.shift());
  }

  stockToFoundation(to) {
    const foundation = this.foundations[to - 1];

    foundation.unshift(this.stock.opened.shift());
  }

  closeStock() {
    this.stock.closed = this.stock.opened.reverse();
    this.stock.opened = [];
  }
}
