# Memory cards game
Mobile application inspired on the "Memory Cards" game.

**Memory Cards** is a memory-based game where the player must remember the positions of numbers from 1 to 9 displayed briefly on a grid of 9 squares. After the numbers disappear, the player is asked to find a specific number's position. If they guess correctly, they earn points and continue playing. If they guess wrong, the game ends.

## Link to app
`https://abelcerezuela.github.io/memory-cards-game/`

## App structure
The app is a **Progressive Web App (PWA)** with two main views:

### 1. Home View
- Text input for the player's name.
- Button to start the game.
- Validates that a valid name is entered.
- Acts as the default route; any invalid route redirects here.

### 2. Game View
- Displays the player's name and current score.
- Difficulty selector:
  - **Easy**: 10 seconds, 10 points
  - **Medium**: 5 seconds, 20 points
  - **Hard**: 2 seconds, 30 points
- Button to start the game round.
- On start:
  - Randomly places numbers 1–9 in the grid.
  - Numbers are visible for a limited time based on difficulty.
  - After time expires, numbers disappear.
  - Player is asked to find a specific number.
  - If correct: green highlight, score increases, new round starts.
  - If incorrect: red highlight, number revealed, game ends.


For more information about building and running this angular app, read the README.md file located in the memory-cards-angular-app folder.