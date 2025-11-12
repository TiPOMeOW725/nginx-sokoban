let map=["WWWWWWW",
    "W     W",
    "W TC  W",
    "WWTCWWW",
    "W  P  W",
    "W TCW W",
    "W     W",
    "WWWWWWW"]; /* W = Wall  T = Target  P = Player  C = Crate   X = Crate on the target  O = Player on the target*/
let key = {};
let playerPos = [4,3]; // 1st = y    2nd = x
let movePos=playerPos;//position user is trying to move to
let isMoving=false;
let isFree=false; //bool indicating if the next cell is free for moving
// Game cycle listen -> check -> update -> redraw

function listen() {
    document.addEventListener('keypress', (e) => {
        key[e.key.toLowerCase()] = true;
    });
}

function checkForFreeSpace(map,movePos,direction){
    let cell=map[movePos[0]][movePos[1]]
    switch (cell){
    case 'W':
        return false;
    case ' ':
    case 'T':
        return true;
    case 'C':
    case 'X':
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
        let beyondY=movePos[0], beyondX=movePos[1]
        checkForFreeSpace(map,[beyondY,beyondX],direction)
    }
    return true;
}

function check() {
    switch(key){
        case 'w':
            movePos[0]-=1
            isFree=checkForFreeSpace(map,movePos,'w')
        case 's':
        case 'a':
        case 'd':
    }
}
