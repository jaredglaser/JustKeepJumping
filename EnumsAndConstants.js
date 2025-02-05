const GRAVITY = 3;
const PLAYERGRAVITY = 6;
const PLAYERMAX = 13;
const MAXPLAT = 20;

const collisionType = {
    ABOVE: 0,
    BELOW: 1,
    FROMLEFT: 2,
    FROMRIGHT: 3,
    NONE: 99
}

const MOVEMENT = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
}

const entityType = {
    PLAYER: 0,
    PLATFORM: 1,
    ENEMY: 2,
    COIN: 3
}