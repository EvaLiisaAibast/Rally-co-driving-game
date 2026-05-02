# Rally Pacenote Academy - Multiplayer Setup

## Overview
The game now supports real-time multiplayer racing! Players can create lobbies, join with a code, and race against each other on the same stage notes.

## Server Setup

### Prerequisites
- Node.js 16+ installed
- npm (comes with Node.js)

### Installation

1. Navigate to the game directory:
```bash
cd "Rally-co-driving-game-main"
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

### Development Mode (with auto-reload)
```bash
npm run dev
```

## Playing Multiplayer

1. Open the game in your browser (file:// or localhost)
2. Click the **Multiplayer** button in the main menu (it has a 👥 icon)
3. Choose one of the following:
   - **Leave blank** and click OK to **create a new lobby**
   - **Enter a lobby code** to join an existing lobby
4. Enter your name when prompted
5. Click **Ready Up** when you're ready to race
6. The host clicks **Start Race** when all players are ready
7. Race! You'll see other players' progress at the top of the screen
8. View results and click **Rematch** to race again

## Features

### Lobby System
- Create private lobbies with automatic 6-character codes
- Join lobbies using the code
- Host can start the race when all players are ready
- Support for up to 4 players per lobby

### Synchronized Racing
- All players get the **same stage notes** for fair competition
- Real-time progress tracking shows other players' positions
- Live notifications when players finish
- Automatic ranking at the end of the race

### Rematch System
- Instant rematch option after race completion
- Lobby persists between races
- All players must ready up again for the next race

## Architecture

### Server (`server.js`)
- Express web server for serving the game client
- Socket.IO for real-time WebSocket communication
- Lobby management and race orchestration
- Deterministic stage note generation for fairness

### Client (`rally.js` - Multiplayer module)
- Socket.IO client connection
- Lobby UI and management
- Race state synchronization
- Progress reporting during races
- Result display and rematch handling

## Technical Details

### WebSocket Events

#### Client → Server
- `create-lobby` - Create a new lobby
- `join-lobby` - Join an existing lobby
- `set-ready` - Toggle ready status
- `start-race` - Host starts the race
- `submit-note-result` - Report progress during race
- `finish-race` - Report race completion
- `request-rematch` - Request a rematch

#### Server → Client
- `player-joined` - New player joined lobby
- `player-left` - Player left lobby
- `player-ready` - Player changed ready status
- `lobby-updated` - Lobby state updated
- `race-countdown` - Race countdown started
- `race-start` - Race has begun
- `player-progress` - Another player's progress update
- `player-finished` - Another player finished
- `race-complete` - All players finished

## Customization

### Change Server URL
Edit the `connect()` call in `rally.js`:
```javascript
Multiplayer.connect('http://your-server-url:3000');
```

### Change Port
Set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## Troubleshooting

### Cannot connect to server
- Ensure the server is running (`npm start`)
- Check firewall settings for port 3000
- Verify the server URL in the client code

### Socket.IO not loading
- Check internet connection (Socket.IO is loaded from CDN)
- Or download `socket.io.min.js` and reference it locally

### Players not seeing each other
- Ensure all players are using the same server
- Check browser console for WebSocket errors
- Try refreshing and rejoining the lobby

## Notes
- The multiplayer uses synchronized stage notes - all players see the same sequence
- Progress updates are sent after each note submission
- The server handles all timing and result calculations
- DNF (Did Not Finish) players are ranked below finishers
