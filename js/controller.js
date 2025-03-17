import { Game } from "./game.js";
import { Interface } from "./view.js";

const processStock = (stock) => {
  const stockData = {};

  stockData.opened = stock.opened.length === 0 ? "Empty" : stock.opened[0];
  stockData.closed = stock.closed.length === 0 ? "Empty" : "X";

  return `${stockData.closed}\t\t${stockData.opened}`;
};

const processPiles = (piles) => {
  const rows = Array.from({ length: 10 }, () => []);

  const newPiles = Array.from({ length: 7 }, (_, i) => {
    const newPile = piles[i].opened
      .concat(Array(piles[i].closed.length).fill("X"))
      .reverse();

    return newPile.concat(Array(10 - newPile.length).fill(""));
  });
  newPiles.unshift(Array.from({ length: 10 }, (_, i) => i));

  newPiles.forEach((pile) => {
    pile.forEach((card, i) => {
      const row = rows[i] || [];
      row.push(card);
    });
  });

  return rows.map((row) => row.join("\t\t")).join("\n");
};

const processFoundation = (foundations) => {
  return foundations
    .map((suit) => (suit.length === 0 ? "Empty" : suit[0]))
    .join("\t\t");
};

const processData = (data) => {
  const stock = processStock(data.stock);
  const piles = processPiles(data.piles);
  const foundations = processFoundation(data.foundations);

  return { stock, piles, foundations };
};

const stockAction = (stock) => {
  const actions = [];

  if (stock.opened.length === 0 || stock.closed.length !== 0) {
    actions.push("3. Turn card from stock");
  }

  if (stock.opened.length === 1) {
    actions.push("4. Stock to pile");
    actions.push("5. Stock to foundation");
  }

  if (stock.closed.length === 0) {
    actions.push("6. Close opened stock");
  }

  return actions.join("\n");
};

const pileToPile = (gameData) => {
  const from = view.takeInput("Enter 'from' Pile number:");
  const index = view.takeInput("Enter row index of the card:");
  const to = view.takeInput("Enter 'to' pile number:");

  game.pileToPile(from, to, index);
};

const pileToFoundation = (gameData) => {
  const from = view.takeInput("Enter 'from' Pile number:");
  const to = view.takeInput("Enter foundation number:");

  game.pileToFoundation(from, to);
};

const turnCardFromStock = () => {
  game.turnCardFromStock();
};

const performAction = (gameData, action) => {
  const actions = [pileToPile, pileToFoundation, turnCardFromStock];

  return actions[action - 1](gameData);
};

const play = (game, view) => {
  const gameData = game.data();
  while (!game.hasWon()) {
    const { stock, piles, foundations } = processData(gameData);
    view.display(stock, foundations, piles);
    view.displayActions(stockAction(gameData.stock));
    const action = view.takeInput("Choose an action:");
    performAction(gameData, action);
  }
};

const main = () => {
  play(game, view);
};

const game = new Game();
const view = new Interface();
main();
