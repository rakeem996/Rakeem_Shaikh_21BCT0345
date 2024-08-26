Below is a basic `README.md` file for your chess-like game project:

---

# Chess-Like Game

This is a simple chess-like game implemented using Node.js, WebSockets, and React. Players take turns moving their characters on a 5x5 board, each with unique movement and attack rules.

## Features

- **Three Character Types:**
  - **Pawn:** Moves one block in any direction (Left, Right, Forward, or Backward).
  - **Hero1:** Moves two blocks straight in any direction. Can eliminate any opponent in its path.
  - **Hero2:** Moves two blocks diagonally in any direction. Can eliminate any opponent in its path.
  
- **Real-Time Updates:** The game uses WebSockets to update all connected clients with the current game state in real-time.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/chess-like-game.git
   cd chess-like-game
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Server:**
   ```bash
   npm start
   ```

   The server will start on port `4000` and the WebSocket server on port `8080`.

4. **Start the React App:**
   ```bash
   cd client
   npm start
   ```

   The React app will start on `http://localhost:3000`.

## How to Play

1. **Setup:**
   - When a client connects, it automatically receives the initial game state.

2. **Making a Move:**
   - Select a character by clicking on it. The character must belong to the player whose turn it is.
   - Use the directional buttons (`Top`, `Bottom`, `Left`, `Right`, `Front Left`, `Front Right`, `Bottom Left`, `Bottom Right`) to move the character.

3. **Turn-Based Gameplay:**
   - After a valid move, the turn switches to the other player.

## Project Structure

- **Server (`index.js`):** Handles game logic, WebSocket connections, and broadcasts game state to all clients.
- **Client (`client/src/App.js`):** Renders the game board and handles user interactions.
- **Game Logic:** Manages character positions, validates moves, and updates the game state.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.

---

This `README.md` provides an overview of the project, including installation instructions, gameplay instructions, and a brief explanation of the project structure. Adjust the content as needed to fit your specific project details.
