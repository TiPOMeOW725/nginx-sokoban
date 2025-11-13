let map=["WWWWWWW",
    "W     W",
    "W TC  W",
    "WWTCWWW",
    "W  P  W",
    "W TCW W",
    "W     W",
    "W     W",
    "WWWWWWW"]; /* W = Wall  T = Target  P = Player  C = Crate   X = Crate on the target  O = Player on the target*/
let gameBoard = document.getElementById("game-board")
let key = {};
let direction = '';
let isMapChanged = false;
let cratesToSet = 3; // crates to set until win
let playerPos = [4,3]; // 1st = y    2nd = x

// Game cycle listen -> check -> update -> redraw

function listen() {
  document.addEventListener('keydown', (e) => {
    if (e.key.length === 1 && !e.repeat) {  
      const lowerKey = e.key.toLowerCase();
      key[lowerKey] = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key.length === 1) {
      const lowerKey = e.key.toLowerCase();
      key[lowerKey] = false;
    }
  });
}

function processKeyPress() {
    if (key['w']) {
        direction = 'w';
        let result = move(map, direction, playerPos, cratesToSet);
        if (result) {
            map = result.map;
            playerPos = result.playerPos;
            cratesToSet = result.cratesToSet;
            isMapChanged = true;
        }
    } else if (key['s']) {
        direction = 's';
        let result = move(map, direction, playerPos, cratesToSet);
        if (result) {
            map = result.map;
            playerPos = result.playerPos;
            cratesToSet = result.cratesToSet;
            isMapChanged = true;
        }
    } else if (key['a']) {
        direction = 'a';
        let result = move(map, direction, playerPos, cratesToSet);
        if (result) {
            map = result.map;
            playerPos = result.playerPos;
            cratesToSet = result.cratesToSet;
            isMapChanged = true;
        }
    } else if (key['d']) {
        direction = 'd';
        let result = move(map, direction, playerPos, cratesToSet);
        if (result) {
            map = result.map;
            playerPos = result.playerPos;
            cratesToSet = result.cratesToSet;
            isMapChanged = true;
        }
    }
    
    // Clear the key after processing to prevent continuous movement
    key = {};
}

function move(map, direction, playerPos, cratesToSet) {
    let destination = [playerPos[0], playerPos[1]];
    let delta = [0, 0];
    
    switch(direction) {
        case 'w': delta = [-1, 0]; break;
        case 's': delta = [1, 0]; break;
        case 'a': delta = [0, -1]; break;
        case 'd': delta = [0, 1]; break;
        default: return null;
    }
    
    destination[0] += delta[0];
    destination[1] += delta[1];
    
    let destinationCell = map[destination[0]][destination[1]];
    
    // Check validity
    if (destinationCell === 'W') return null; // Wall
    
    // If moving into crate, check if crate can be pushed
    if (destinationCell === 'C' || destinationCell === 'X') {
        let crateDestination = [destination[0] + delta[0], destination[1] + delta[1]];
        let crateDestinationCell = map[crateDestination[0]][crateDestination[1]];
        
        // Can't push into wall or another crate
        if (crateDestinationCell === 'W' || crateDestinationCell === 'C' || crateDestinationCell === 'X') {
            return null;
        }
    }
    
    // Move is valid - update map
    let newMap = map.map(row => row.split(''));
    let currentPlayerCell = newMap[playerPos[0]][playerPos[1]];
    
    // Handle crate push
    if (destinationCell === 'C' || destinationCell === 'X') {
        let crateDestination = [destination[0] + delta[0], destination[1] + delta[1]];
        let crateDestinationCell = newMap[crateDestination[0]][crateDestination[1]];
        
        // Move crate
        newMap[crateDestination[0]][crateDestination[1]] = (crateDestinationCell === 'T') ? 'X' : 'C';
        
        // Adjust the goal to win
        if (crateDestinationCell === 'T') {
            cratesToSet--;
        } else if (destinationCell === 'X') {
            cratesToSet++;
        }
        
        // Move player to crate position
        newMap[destination[0]][destination[1]] = (destinationCell === 'X') ? 'O' : 'P';
    } else {
        // Simple move
        newMap[destination[0]][destination[1]] = (destinationCell === 'T') ? 'O' : 'P';
    }
    
    // Clear old position
    newMap[playerPos[0]][playerPos[1]] = (currentPlayerCell === 'O') ? 'T' : ' ';
    
    return {
        map: newMap.map(row => row.join('')),
        playerPos: destination,
        cratesToSet: cratesToSet
    };
}

function render(gameBoard, map) {
    gameBoard.innerHTML = '';
    for(const row of map) {
        for(const element of row) {
            const newDiv = document.createElement('div');
            // Add a CSS class
            switch(element) {
                case 'W':
                    newDiv.classList.add('wall');
                    break;
                case 'T':
                    newDiv.classList.add('ground_target');
                    break;
                case 'X':
                    newDiv.classList.add('crate_target');
                    break;
                case 'O':
                    newDiv.classList.add('player_ground');
                    break;
                case 'C':
                    newDiv.classList.add('crate');
                    break;
                case ' ':
                    newDiv.classList.add('ground');
                    break;
                case 'P':
                    newDiv.classList.add('player');
                    break;
            }
            gameBoard.appendChild(newDiv);
        }
    }
}

function gameLoop() {
    // Process input
    processKeyPress();
    
    // Render if map changed
    if (isMapChanged) {
        render(gameBoard, map);
        isMapChanged = false;
    }
    
    // Check win condition
    if (cratesToSet === 0) {
        render(gameBoard, map); // Render last time
        alert("You win! Reload the page to start again");
        return null;
    }
    requestAnimationFrame(gameLoop);
}

function setupGrid(gameBoard, map) {
    const rows = map.length;
    const cols = map[0].length;
    
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 80px)`;
}

setupGrid(gameBoard, map);
// Set up event listeners once
listen();

// Render initial state
render(gameBoard, map);

// Start the game loop
requestAnimationFrame(gameLoop);