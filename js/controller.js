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

const start = (game, view) => {
  const gameData = game.start();
  const { stock, piles, foundations } = processData(gameData);
  view.display(stock, foundations, piles);
};

const main = () => {
  const game = new Game();
  const view = new Interface();
  start(game, view);
};

main();
