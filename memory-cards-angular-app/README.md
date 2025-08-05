# Memory Cards Game
Mobile application inspired on the "Memory Cards" game.

**Memory Cards** is a memory-based game where the player must remember the positions of numbers from 1 to 9 displayed briefly on a grid of 9 squares. After the numbers disappear, the player is asked to find a specific number's position. If they guess correctly, they earn points and continue playing. If they guess wrong, the game ends.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

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

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
