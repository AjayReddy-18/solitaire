import { Suit } from "./suit.js";

export class Deck {
  constructor() {
    this.spades = new Suit("SPADES", "black");
    this.hearts = new Suit("HEARTS", "red");
    this.clubs = new Suit("CLUBS", "black");
    this.diamonds = new Suit("DIAMONDS", "red");
    this.cards = this.allCards();
  }

  allCards() {
    const suits = [this.spades, this.hearts, this.clubs, this.diamonds];

    return suits.flatMap((suit) => {
      return Object.keys(suit.cards).map((card) => suit.cards[card]);
    });
  }

  #shuffle() {
    const copy = [...this.cards];
    return copy.sort(() => Math.random() - 0.5);
  }

  solitaireArrangement() {
    // const cards = [...this.cards];
    const cards = this.#shuffle();
    return {
      piles: Array.from({ length: 7 }, (_, i) => {
        const cardsInPile = cards.splice(0, i + 1);
        const [opened, ...closed] = cardsInPile;

        return { opened: [opened], closed };
      }),
      stock: { opened: [], closed: cards },
    };
  }
}
