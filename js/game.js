import { Deck } from "./deck.js";

export class Game {
  constructor() {
    this.deck = new Deck();
    const { stock, piles } = this.deck.solitaireArrangement();
    this.stock = stock;
    this.piles = piles;
    this.foundations = [
      [{ value: 0, suit: "SPADES" }],
      [{ value: 0, suit: "HEARTS" }],
      [{ value: 0, suit: "CLUBS" }],
      [{ value: 0, suit: "DIAMONDS" }],
    ];
    this.moves = 0;
    this.startTime = Date.now();
  }

  incrementMoves() {
    this.moves++;
  }

  hasWon() {
    const totalCards = this.foundations.reduce(
      (sum, foundation) => sum + foundation.length,
      0
    );

    return totalCards === 56;
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

  results() {
    return { moves: this.moves, time: [Date.now() - this.startTime] };
  }
}
