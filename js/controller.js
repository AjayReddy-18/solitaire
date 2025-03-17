import { Game } from "./game.js";
import { Interface } from "./view.js";

const actions = {
  1: "1. Pile to Pile",
  2: "2. Pile to foundation",
  3: "3. Turn card from stock",
  4: "4. Stock to pile",
  5: "5. Stock to foundation",
  6: "6. Close opened stock",
};

const inputPrompts = {
  fromPile: "Enter 'from' Pile number:",
  toPile: "Enter 'to' Pile number:",
  rowIndex: "Enter row index of the card:",
  foundation: "Enter foundation number:",
};

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

const availableActions = (stock) => {
  const availableActions = [actions["1"], actions["2"]];

  if (stock.opened.length === 0 || stock.closed.length !== 0) {
    availableActions.push(actions["3"]);
  }

  if (stock.opened.length > 0) {
    availableActions.push(actions["4"]);
    availableActions.push(actions["5"]);
  }

  if (stock.closed.length === 0) {
    availableActions.push(actions["6"]);
  }

  return availableActions.join("\n");
};

const pileToPile = (gameData) => {
  const from = view.takeInput(inputPrompts.fromPile);
  const index = view.takeInput(inputPrompts.rowIndex);
  const to = view.takeInput(inputPrompts.toPile);

  game.pileToPile(from, to, index);
};

const pileToFoundation = (gameData) => {
  const from = view.takeInput(inputPrompts.fromPile);
  const to = view.takeInput(inputPrompts.foundation);

  game.pileToFoundation(from, to);
};

const turnCardFromStock = () => {
  game.turnCardFromStock();
};

const stockToPile = () => {
  const to = view.takeInput(inputPrompts.toPile);

  game.stockToPile(to);
};

const stockToFoundation = () => {
  const to = view.takeInput(inputPrompts.foundation);

  game.stockToFoundation(to);
};

const closeStock = () => {
  game.closeStock();
};

const performAction = (gameData, action) => {
  const actions = [
    pileToPile,
    pileToFoundation,
    turnCardFromStock,
    stockToPile,
    stockToFoundation,
    closeStock,
  ];

  return actions[action - 1](gameData);
};

const play = (game, view) => {
  const gameData = game.data();
  while (!game.hasWon()) {
    const { stock, piles, foundations } = processData(gameData);
    view.display(stock, foundations, piles);
    view.displayActions(availableActions(gameData.stock));
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
