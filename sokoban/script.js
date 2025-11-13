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
let isMapChanged=false
let cratesToSet=3 // crates to set until win
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
  processKeyPress()
  if(isMapChanged===true){
    
  }
}

function processKeyPress() {
    switch(key){
        case 'w':
            direction='w'
            move(map,direction,playerPos,cratesToSet)
        case 's':
            direction='s'
            move(map,direction,playerPos,cratesToSet)
        case 'a':
            direction='a'
            move(map,direction,playerPos,cratesToSet)
        case 'd':
            direction='d'
            move(map,direction,playerPos,cratesToSet)
    }
}


function move(map, direction, playerPos,cratesToSet) {
    let destination = [playerPos[0], playerPos[1]];
    let delta = [0, 0];
    let isMapChanged=false;
    this.cratesToSet=cratesToSet
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
        if (crateDestinationCell === 'X'){
            cratesToSet--
        } else if (crateDestinationCell === 'C'){
            cratesToSet++
        }
        // Move player to crate position
        newMap[destination[0]][destination[1]] = (destinationCell === 'X') ? 'O' : 'P';
        isMapChanged=true
    } else {
        // Simple move
        newMap[destination[0]][destination[1]] = (destinationCell === 'T') ? 'O' : 'P';
        isMapChanged=true
    }
    
    // Clear old position
    newMap[playerPos[0]][playerPos[1]] = (currentPlayerCell === 'O') ? 'T' : ' ';
    
    return {
        map: newMap.map(row => row.join('')),
        playerPos: destination,
        isMapChanged: destination,
        cratesToSet: destination
    };
}

