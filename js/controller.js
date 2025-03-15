import { Game } from "./game.js";
import { Interface } from "./view.js";

const game = new Game();
const view = new Interface();

const viewData = game.start();
view.display(viewData);