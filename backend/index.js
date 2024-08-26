const express = require('express');
const {WebSocketServer} = require('ws');

const sockserver = new WebSocketServer({port:443});

const app = express()

// app.use(express.static('client/build'));

const gameState = {
    board: Array(5).fill(null).map(() => Array(5).fill(null)),
    players: {},
    turn: 'A', // Player A starts
};

// Basic setup for characters
const initialSetup = (player) => {
    const row = player === 'A' ? 0 : 4;
    gameState.board[row] = ['P1', 'H1', 'H2', 'P2', 'P3'].map(name => `${player}-${name}`);
    gameState.players[player] = { characters: ['P1', 'H1', 'H2', 'P2', 'P3'] };
};

const initializeGame = () => {
    initialSetup('A');
    initialSetup('B');
};

initializeGame();

// for(let i=0; i<5; i++) {
//     for(let j=0; j<5; j++) {
//         process.stdout.write(` ${gameState.board[i][j]}`);
//     }
//     console.log("\n")
// }

// Function to broadcast game state to all clients
const broadcastState = () => {
    sockserver.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(gameState));
        }
    });
};

function findCharacterPosition(player, character) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (gameState.board[i][j] === `${player}-${character}`) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function calculateNewPosition(x, y, move) {
    switch (move) {
        case 'L': return [x, y - 1];
        case 'R': return [x, y + 1];
        case 'F': return [x - 1, y];
        case 'B': return [x + 1, y];
        case 'FL': return [x - 1, y - 1];
        case 'FR': return [x - 1, y + 1];
        case 'BL': return [x + 1, y - 1];
        case 'BR': return [x + 1, y + 1];
        default: return [x, y];
    }
}

function isValidMove(player, character, x, y, newX, newY) {
    if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
        return false; // Out of bounds
    }

    if (gameState.board[newX][newY] && gameState.board[newX][newY].startsWith(player)) {
        return false; // Can't move to a space occupied by a friendly character
    }

    // Additional movement rules depending on character type can be added here

    return true;
}

// app.use('/', (req,res) => {
//     res.sendFile('/temp.html', {root:__dirname});
// });

sockserver.on('connection', ws => {
    console.log("new client connected");
    ws.send("connection established");
    ws.on('close', ()=>{console.log("connection disconnected")});
    ws.on('message', (message)=> {
        // sockserver.clients.forEach(clients => {
        //     console.log(`distributing message: ${message}`);
        //     clients.send(`${message}`);
        // })
        

        // const data = JSON.parse(message);
        console.log('Received:', data);

        if(data.type === 'move') {
            const {player, character, move} = data;
        }

        if (gameState.turn !== player) {
            ws.send(JSON.stringify({ error: 'Not your turn!' }));
            return;
        }

        // Implement move validation and update game state
        const [x, y] = findCharacterPosition(player, character);
        const [newX, newY] = calculateNewPosition(x, y, move);

        if (isValidMove(player, character, x, y, newX, newY)) {
            gameState.board[x][y] = null;
            gameState.board[newX][newY] = `${player}-${character}`;

            // Change turn
            gameState.turn = player === 'A' ? 'B' : 'A';
        } else {
            ws.send(JSON.stringify({ error: 'Invalid move!' }));
        }

        broadcastState();

        ws.send(JSON.stringify(gameState));

    })
    ws.onerror = function () {
        console.log('websocket error')
    }
})


app.listen(3000, ()=> {
    console.log("listening on port 3000");
})