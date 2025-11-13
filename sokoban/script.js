let map=["WWWWWWW",
    "W     W",
    "W TC  W",
    "WWTCWWW",
    "W  P  W",
    "W TCW W",
    "W     W",
    "WWWWWWW"]; /* W = Wall  T = Target  P = Player  C = Crate   X = Crate on the target  O = Player on the target*/
let key = {};
let direction = '';
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

function move(map, direction, playerPos) {
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
        let cratedestination = [destination[0] + delta[0], destination[1] + delta[1]];
        let cratedestinationCell = map[cratedestination[0]][cratedestination[1]];
        
        // Can't push into wall or another crate
        if (cratedestinationCell === 'W' || cratedestinationCell === 'C' || cratedestinationCell === 'X') {
            return null;
        }
    }
    
    // Move is valid - update map
    let newMap = map.map(row => row.split(''));
    let currentPlayerCell = newMap[playerPos[0]][playerPos[1]];
    
    // Handle crate push
    if (destinationCell === 'C' || destinationCell === 'X') {
        let cratedestination = [destination[0] + delta[0], destination[1] + delta[1]];
        let cratedestinationCell = newMap[cratedestination[0]][cratedestination[1]];
        
        // Move crate
        newMap[cratedestination[0]][cratedestination[1]] = (cratedestinationCell === 'T') ? 'X' : 'C';
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
        playerPos: destination
    };
}



function processKeyPress() {
    switch(key){
        case 'w':
            direction='w'
            move(map,direction,playerPos)
        case 's':
            direction='s'
            move(map,direction,playerPos)
        case 'a':
            direction='a'
            move(map,direction,playerPos)
        case 'd':
            direction='d'
            move(map,direction,playerPos)
    }
}

