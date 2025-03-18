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

const errorMessages = {
  action: "Invalid action!",
  move: "Invalid move!",
};

const processStock = (stock) => {
  const stockData = {};

  stockData.opened = stock.opened.length === 0 ? "Empty" : stock.opened[0];
  stockData.closed = stock.closed.length === 0 ? "Empty" : "X";

  return `${stockData.closed}\t\t${stockData.opened}`;
};

const processPiles = (piles) => {
  const max = piles.reduce((max, pile) => {
    const pileLength = pile.opened.length + pile.closed.length;
    return pileLength > max ? pileLength : max;
  }, 0);

  const rows = Array.from({ length: max }, () => []);

  const newPiles = Array.from({ length: 7 }, (_, i) => {
    const newPile = piles[i].opened
      .concat(Array(piles[i].closed.length).fill("X"))
      .reverse();

    return newPile.concat(Array(10 - newPile.length).fill(""));
  });
  newPiles.unshift(Array.from({ length: max }, (_, i) => i));

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
    .map((suit) => (suit.length === 1 ? "Empty" : suit[0]))
    .join("\t\t");
};

const processData = (data) => {
  const stock = processStock(data.stock);
  const piles = processPiles(data.piles);
  const foundations = processFoundation(data.foundations);

  return { stock, piles, foundations };
};

const availableActions = (data) => {
  const { stock } = data;
  const availableActions = [1, 2];

  if (stock.opened.length === 0 || stock.closed.length !== 0) {
    availableActions.push(3);
  }

  if (stock.opened.length > 0) {
    availableActions.push(4);
    availableActions.push(5);
  }

  if (stock.closed.length === 0) {
    availableActions.push(6);
  }

  return availableActions;
};

const inRange = (value, start, end) => {
  return value < end && value >= start;
};

const isPreceding = (bottom, top) => top.value - bottom.value === 1;

const isSameColor = (bottom, top) => bottom.color === top.color;

const areValidInputsForPTP = (tableau, from, to, index) => {
  const fromPile = tableau[from - 1];
  const toPile = tableau[to - 1];
  const swapIndex = fromPile.closed.length + fromPile.opened.length - index - 1;
  const bottom = toPile.opened[0] || { value: 14 };
  const top = fromPile.opened[swapIndex];

  return (
    fromPile &&
    toPile &&
    inRange(
      index,
      fromPile.closed.length,
      fromPile.closed.length + fromPile.opened.length
    ) &&
    isPreceding(top, bottom) &&
    !isSameColor(bottom, top)
  );
};

const pileToPile = (gameData) => {
  const from = view.takeInput(inputPrompts.fromPile);
  const index = view.takeInput(inputPrompts.rowIndex);
  const to = view.takeInput(inputPrompts.toPile);

  if (!areValidInputsForPTP(gameData.piles, from, to, index)) {
    view.displayError(errorMessages.move);
    return false;
  }

  game.pileToPile(from, to, index);
  return true;
};

const isValidForFoundation = (foundationTop, candidate) => {
  return (
    foundationTop.suit === candidate.suit &&
    isPreceding(foundationTop, candidate)
  );
};

const areValidInputsForPTF = (pile, foundation) => {
  const pileTop = pile.opened[0];
  return pileTop && isValidForFoundation(foundation[0], pileTop);
};

const pileToFoundation = (gameData) => {
  const from = view.takeInput(inputPrompts.fromPile);
  const to = view.takeInput(inputPrompts.foundation);

  const { piles, foundations } = gameData;

  if (!areValidInputsForPTF(piles[from - 1], foundations[to - 1])) {
    view.displayError(errorMessages.move);
    return false;
  }

  game.pileToFoundation(from, to);
  return true;
};

const turnCardFromStock = () => {
  game.turnCardFromStock();
  return true;
};

const areValidInputsForSTP = (stockTop, pile) => {
  const pileTop = pile.opened[0] || { value: 14 };

  return isPreceding(stockTop, pileTop) && !isSameColor(pileTop, stockTop);
};

const stockToPile = (gameData) => {
  const to = view.takeInput(inputPrompts.toPile);

  if (!areValidInputsForSTP(gameData.stock.opened[0], gameData.piles[to - 1])) {
    view.displayError(errorMessages.move);
    return false;
  }

  game.stockToPile(to);
  return true;
};

const stockToFoundation = (gameData) => {
  const to = view.takeInput(inputPrompts.foundation);
  const { foundations, stock } = gameData;

  if (!isValidForFoundation(foundations[to - 1][0], stock.opened[0])) {
    view.displayError(errorMessages.move);
    return false;
  }

  game.stockToFoundation(to);
  return true;
};

const closeStock = () => {
  game.closeStock();
  return true;
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

const availableActionsInString = (validActions) => {
  return validActions.map((actionIndex) => actions[actionIndex]).join("\n");
};

const onScreen = (data, actions) => {
  const { stock, piles, foundations } = processData(data);
  view.display(stock, foundations, piles);
  view.displayActions(actions);
};

const invalidAction = () => {
  view.displayError(errorMessages.action);
};

const isValidAction = (validActions, action) => {
  return validActions.includes(action);
};

const playerTurn = (data) => {
  const validActions = availableActions(data);
  const validActionsInString = availableActionsInString(validActions);
  onScreen(data, validActionsInString);
  const action = view.takeInput("Choose an action:");
  if (!isValidAction(validActions, action)) return invalidAction();
  return performAction(data, action);
};

const play = (game) => {
  const gameData = game.data();
  while (!game.hasWon()) {
    if (playerTurn(gameData)) game.incrementMoves();
  }
  const results = game.results();
  view.displayResults = results;
};

const main = () => {
  play(game);
};

const game = new Game();
const view = new Interface();
main();