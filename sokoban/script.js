let map=["WWWWWWW",
    "W     W",
    "W TC  W",
    "WWTCWWW",
    "W  P  W",
    "W TCW W",
    "W     W",
    "WWWWWWW"]; /* W = Wall  T = Target  P = Player  C = Crate   X = Crate on the target  O = Player on the target*/
let key = ''
let playerPos = [4,3]
// Game cycle listen -> check -> update -> redraw

function listen() {
    document.addEventListener('keypress', (e) => {
        key[e.key.toLowerCase()] = true;
    });
}

function check() {

}