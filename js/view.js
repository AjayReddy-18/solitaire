export class Interface {
  constructor() {
    this.header = `\tstock\t\t\t\t\t\t\t      foundation\nclosed\t\topened\t\t\t\tspades\t\thearts\t\tclubs\t\tdiamonds`;
    this.pileHeader =
      "Pile 1\t\tPile 2\t\tPile 3\t\tPile 4\t\tPile 5\t\tPile 6\t\tPile 7";
  }

  display(stock, foundations, piles) {
    console.clear();
    console.log(this.header);
    console.log(stock, "\t\t\t\t", foundations);
    console.log();
    console.log();
    console.log();
    console.log(this.pileHeader);
    console.log(piles);
  }

  displayPrompt() {}
  displayError() {}
  takeInput() {}
}
