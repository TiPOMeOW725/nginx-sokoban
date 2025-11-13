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
let movePos=playerPos;//position user is trying to move to
let isMoving=false; // first bool indicating if the next cell is free for moving    the next one 
// Game cycle listen -> check -> update -> redraw

function listen() {
    document.addEventListener('keypress', (e) => {
        key[e.key.toLowerCase()] = true;
    });
}

function checkForFreeSpace(map,movePos,direction,isCrateBehind){
    let cell=map[movePos[0]][movePos[1]]
    switch (cell){
    case 'W':
        return false;
    case ' ':
    case 'T':
        return true;
    case 'C':
    case 'X':
        if (isCrateBehind===true){
            return false
        }
        switch(direction){
            case 'w':
                movePos[0]-=1
                break
            case 's':
                movePos[0]+=1
                break
            case 'a':
                movePos[1]-=1
                break
            case 'd':
                movePos[1]+=1
                break
        }                                            
        return checkForFreeSpace(map,movePos,direction,true)
    }
}

function move(map,movePos,playerPos){
    let delta;
    while(movePos[0]===playerPos[0] && movePos[1]===playerPos[1]){
        if (movePos[0]!=playerPos[0]){
            while(1){
                delta=movePos[0]-playerPos[0]
                map[movePos[0]][movePos[1]]=map[movePos[0]+delta][movePos[1]]}
        }
    }
}



function check() {
    switch(key){
        case 'w':
            movePos[0]-=1
            direction='w'
            isFree=checkForFreeSpace(map,movePos,direction,false)
            if(isFree){

            }
        case 's':
        case 'a':
        case 'd':
    }
}

// Your existing code above...

// TEST SECTION - Remove later
console.log("Testing checkForFreeSpace:");
console.log("Player -> Empty:", checkForFreeSpace(map, [4, 4], 'd', false)); // should be true
console.log("Player -> Wall:", checkForFreeSpace(map, [4, 0], 'a', false));  // should be false
console.log("Player -> Crate -> Empty:", checkForFreeSpace(map, [2, 2], 'a', false)); // should be true?
//console.log("Player -> Crate -> Crate:", checkForFreeSpace(map, [?, ?], '?', false)); // should be false