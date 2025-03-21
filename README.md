# Solitaire CLI Game

Welcome to the **Solitaire CLI Game**! This is a simple text-based version of Solitaire where you can play directly from the terminal.

## Game Instructions

The game starts with a specific layout, where you need to move cards between **piles**, **foundations**, and the **stock** to win.

### Game Layout

The game board is structured as follows:

#### Stock and Foundation:


#### Rows and Piles:


### Available Actions

1. **Pile to Pile**: Move a card from one pile to another.
2. **Pile to Foundation**: Move a card from a pile to the foundation if it's in the correct order.
3. **Turn card from Stock**: Turn over a new card from the stock (closed pile) and make it available.
4. **Stock to Pile**: Move a card from the stock directly to a pile.
5. **Stock to Foundation**: Move a card from the stock directly to the foundation if it's in the correct order.

### Tips:
- The goal is to move all the cards to the **foundation piles** in ascending order of each suit.
- Foundation piles must be built by suit in the following order: **Ace, 2, 3, 4, ..., King**.
- Piles are built by alternating colors and descending order (e.g., **Red Queen** can be placed on **Black King**).
- You can turn cards from the stock when there are no more valid moves in the piles.

### Suggested Terminal Window Size

For the best view and to ensure that the game interface is properly aligned, **please resize your terminal window** to **127 X 35**.

This will allow all the game data to be displayed cleanly and ensure you can see the entire board without any wrapping issues.

---

Enjoy the game! Try to move all the cards to the foundation piles and see if you can win!

