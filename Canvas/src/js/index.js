import MakeWorld from './MakeWorld';
import Player from './player';
import Move from './move';
import Armes from './arme';
import Draw from './draw'

let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let downPressed = false;
let enterPressed = false;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvaWidth = canvas.width;
const canvaHeight = canvas.height;

const celuleWidth = MakeWorld.makeGridData(canvaWidth);
const celuleHeight = MakeWorld.makeGridData(canvaHeight);
const celuleWidthHeight = MakeWorld.makeCeluleWidthHeightGrid(
    celuleHeight,
    celuleWidth,
    canvaWidth,
    canvaHeight
);
const celuleObstacle = MakeWorld.makeDataOfObstacle(10, celuleWidthHeight);
const celuleWidthHeightUpdate = MakeWorld.makeCeluleSafeAfterObstacle(
    celuleWidthHeight,
    celuleObstacle
);
const celuleArme = MakeWorld.makeDataArme(celuleWidthHeightUpdate, 4);
const celuleWidthHeightUpdate2 = MakeWorld.makeCeluleSafeAfterObstacle(
    celuleWidthHeight,
    celuleArme
);

const celulePlayer = MakeWorld.makeDataPlayer(celuleWidthHeightUpdate2, 2);

console.log('width TABLEAU');
console.log(celuleWidth);
console.log('Height TABLEAU');
console.log(celuleHeight);

console.log('width & height TABLEAU OBJECT');
console.log(celuleWidthHeight);
console.log(' Update width & height TABLEAU OBJECT');
console.log(celuleWidthHeightUpdate);

console.log('celule Obestacle');
console.log(celuleObstacle);

console.log('celule Arme');
console.log(celuleArme);

console.log(' Update width & height TABLEAU OBJECT');
console.log(celuleWidthHeightUpdate2);

console.log(' CELULE PLAYER');
console.log(celulePlayer);


const player1 = new Player(
    celulePlayer[0].width,
    celulePlayer[0].height,
    0,
    0,
    0,
    0,
    'rgba(125, 206, 160,0.5)',
    true
);
const player2 = new Player(
    celulePlayer[1].width,
    celulePlayer[1].height,
    0,
    0,
    0,
    0,
    'rgba(175, 122, 197,0.5)',
    false
);

const fullArmes = [{
        name: new Armes(
            'arme1',
            celuleArme[0].width,
            celuleArme[0].height,
            '#8F6787',
            50
        ),
    },
    {
        name: new Armes(
            'arme2',
            celuleArme[1].width,
            celuleArme[1].height,
            '#27242C',
            100
        ),
    },
    {
        name: new Armes(
            'arme3',
            celuleArme[2].width,
            celuleArme[2].height,
            '#A3AD0B',
            20
        ),
    },
    {
        name: new Armes(
            'arme4',
            celuleArme[3].width,
            celuleArme[3].height,
            '#21DE7C',
            70
        ),
    },
];
console.log('LOG ARRAY ARMES');
console.log(fullArmes);

console.log('LOG PLAYER 1');
console.log(player1);

console.log('LOG PLAYER 2');
console.log(player2.move);



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 38) {
        topPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    } else if (e.keyCode == 13) {
        enterPressed = true;
    } else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 38) {
        topPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    } else if (e.keyCode == 13) {
        enterPressed = false;
    } else if (e.keyCode == 32) {
        spacePressed = true;
    }
}
const fullPlayer = [player1, player2];

function take(player, armes) {
    armes.forEach((arms, index) => {
        if (player.width == arms.name.width && player.height == arms.name.height) {
            if (player.gun == 0 && player.arme == undefined) {
                console.log('you have Armes');
                player.arme = arms;
                console.log(player.arme);
                armes.splice(index, 1);
                console.log(index);
                player.gun = 1;
                console.log(player.gun);
            } else if (player.gun == 1) {
                console.log('CHANGE');
                player.arme.name.width = player.width;
                player.arme.name.height = player.height;
                armes.push(player.arme);
                player.arme = arms;
                armes.splice(index, 1);
                player.gun = 2;
            }
        }
    });
}

function specilaStopTurn(player, armes) {
    armes.forEach((arme) => {
        if (player.width != arme.name.width && player.height != arme.name.height) {
            if (player.gun != 0) {
                player.gun == 2 ? (player.gun = 1) : (player.gun = 1);
                console.log(player.gun);
            }
        }
    });
}

function donTakeArmes(player) {
    if (player.gun != 0) {
        player.gun == 2 ? (player.gun = 1) : (player.gun = 1);
        console.log(player.gun);
    }
}
let move = 3




Move.makeDataMovePlayer(player1, celuleObstacle, move);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (player1.fight == false) {

        Draw.drawGrid(ctx, celuleWidthHeightUpdate2);
        Draw.drawObstacle(ctx, celuleObstacle);
        Draw.drawArms(ctx, fullArmes);
        Draw.drawPlayer(ctx, player1);
        Draw.drawPlayer(ctx, player2);
        if (player1.play) {
            Draw.drawMovement(ctx, player1)


            take(player1, fullArmes);
            // move right


            if (rightPressed && player1.move.right != 0) {

                player1.width == canvaWidth - 50 ?
                    (player1.width = canvaWidth - 50) :
                    (player1.width += 50);
                player1.move.right -= 50;

                move <= 0 ? move = 0 : move -= 1;
                rightPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);

                console.log(move);
                if (player1.width == player2.width - 50 && player1.height == player2.height || player1.width == player2.width && (player1.height == player2.height + 50 || player1.height == player2.height - 50)) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true
                }

                if (player1.move.right == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3
                    donTakeArmes(player1);
                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && leftPressed && player1.move.left != 0) {
                player1.width == 0 ? (player1.width = 0) : (player1.width -= 50);
                player1.move.left -= 50;

                move <= 0 ? move = 0 : move -= 1;

                donTakeArmes(player1);

                leftPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);

                if (player1.width == player2.width + 50 && player1.height == player2.height || player1.width == player2.width && (player1.height == player2.height + 50 || player1.height == player2.height - 50)) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true

                }
                if (player1.move.left == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3

                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && topPressed && player1.move.top != 0) {
                player1.height == 0 ? (player1.height = 0) : (player1.height -= 50);
                player1.move.top -= 50;
                move <= 0 ? move = 0 : move -= 1;

                topPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);
                if (player1.height == player2.height + 50 && player1.width == player2.width || player1.height == player2.height && (player1.width == player2.width + 50 || player1.width == player2.width - 50)) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true

                }
                if (player1.move.top == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3

                    donTakeArmes(player1);

                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && downPressed && player1.move.down != 0) {
                player1.height == canvaHeight - 50 ?
                    (player1.height = canvaHeight - 50) :
                    (player1.height += 50);
                player1.move.down -= 50;

                move <= 0 ? move = 0 : move -= 1;

                downPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);
                if (player1.height == player2.height - 50 && player1.width == player2.width || player1.height == player2.height && (player1.width == player2.width + 50 || player1.width == player2.width - 50)) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true

                }
                if (player1.move.down == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3

                    donTakeArmes(player1);

                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && enterPressed) {
                player1.move.down = 0;
                player1.move.top = 0;
                player1.move.left = 0;
                player1.move.right = 0;


                if (player1.move.down == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3
                    specilaStopTurn(player1, fullArmes);
                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                    enterPressed = false;
                }
            }
        }
        if (player2.play) {
            Draw.drawMovement(ctx, player2)

            take(player2, fullArmes);

            if (player2.play && rightPressed && player2.move.right != 0) {
                player2.width == canvaWidth - 50 ?
                    (player2.width = canvaWidth - 50) :
                    (player2.width += 50);
                player2.move.right -= 50;
                move <= 0 ? move = 0 : move -= 1;

                rightPressed = false;

                Move.makeDataMovePlayer(player2, celuleObstacle, move);

                if (player2.move.right == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3

                    donTakeArmes(player2);
                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            } // move left

            if (player2.play && leftPressed && player2.move.left != 0) {
                player2.width == 0 ? (player2.width = 0) : (player2.width -= 50);
                player2.move.left -= 50;
                move <= 0 ? move = 0 : move -= 1;
                leftPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);

                if (player2.move.left == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3

                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            } // move top

            if (player2.play && topPressed && player2.move.top != 0) {
                player2.height == 0 ? (player2.height = 0) : (player2.height -= 50);
                player2.move.top -= 50;
                move <= 0 ? move = 0 : move -= 1;
                topPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);

                if (player2.move.top == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3
                    player2.gun == 2 ? (player2.gun = 1) : (player2.gun = 0);
                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            }
            // move down

            if (player2.play && downPressed && player2.move.down != 0) {
                player2.height == canvaHeight - 50 ?
                    (player2.height = canvaHeight - 50) :
                    (player2.height += 50);
                player2.move.down -= 50;
                move <= 0 ? move = 0 : move -= 1;

                downPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);

                if (player2.move.down == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3

                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            }
            // stop turn

            if (player2.play && enterPressed) {
                player2.move.down = 0;
                player2.move.top = 0;
                player2.move.left = 0;
                player2.move.right = 0;
                if (player2.move.down == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3

                    specilaStopTurn(player2, fullArmes);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                    enterPressed = false;

                }
            }
            // Take armes
        }
    } else {
        Draw.drawGrid(ctx, celuleWidthHeightUpdate2);

    }
}

console.log('-------  Array player   ------');

console.log(fullPlayer);


setInterval(draw, 10);