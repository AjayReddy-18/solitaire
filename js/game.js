export class Game {
  constructor() {
    this.stock = { opened: [], closed: [] };
    this.piles = {
      0: { opened: [], closed: [] },
      1: { opened: [], closed: [] },
      2: { opened: [], closed: [] },
      3: { opened: [], closed: [] },
    };
    this.foundations = { spades: [], hearts: [], clubs: [], diamonds: [] };
  }

  start() {
    this.piles = {
      0: { opened: ["SK"], closed: [""] },
      1: { opened: ["HK"], closed: ["", ""] },
      2: { opened: ["CK"], closed: ["", "", ""] },
      3: { opened: ["DK"], closed: [] },
      4: { opened: ["A"], closed: [] },
      5: { opened: ["B"], closed: [] },
      6: { opened: ["C"], closed: [] },
    };
    this.foundations = {
      spades: ["Q"],
      hearts: ["Q"],
      clubs: ["Q"],
      diamonds: ["Q"],
    };
    this.stock.opened = ["S3"];

    const { piles, foundations, stock } = this;
    return { piles, foundations, stock };
  }

  takeCardFromStock() {}
  placeCardInFoundation() {}
  placeCardInPile() {}
  result() {}
}
