import MakeWorld from './MakeWorld';
import Player from './player'
import Move from './move'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvaWidth = canvas.width;
const canvaHeight = canvas.height;
let armeColor = ['#8F6787', '#27242C', '#A3AD0B', '#21DE7C'];

const celuleWidth = MakeWorld.makeGridData(canvaWidth);
const celuleHeight = MakeWorld.makeGridData(canvaHeight);
const celuleWidthHeight = MakeWorld.makeCeluleWidthHeightGrid(
    celuleHeight,
    celuleWidth,
    canvaWidth,
    canvaHeight
);
const celuleObstacle = MakeWorld.makeDataOfObstacle(50, celuleWidthHeight);
const celuleWidthHeightUpdate = MakeWorld.makeCeluleSafeAfterObstacle(
    celuleWidthHeight,
    celuleObstacle
);
const celuleArme = MakeWorld.makeDataOfObstacle(4, celuleWidthHeight);
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

class Draw {
    static drawGrid(celule) {
        celule.forEach((gridDraw) => {
            ctx.beginPath();
            ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
            ctx.closePath();
        });
    }
    static drawObstacle(celules) {
        celules.forEach((celule) => {
            ctx.beginPath();
            ctx.rect(celule.width, celule.height, 50, 50);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.closePath();
        });
    }
    static drawArms(celules) {
        let index = 0;
        celules.forEach((celule) => {
            ctx.beginPath();
            ctx.rect(celule.width, celule.height, 50, 50);
            ctx.fillStyle = armeColor[index];
            ctx.fill();
            ctx.closePath();
            index += 1;
        });
    }
    static drawPlayer(player) {
        ctx.beginPath();
        ctx.rect(player.width, player.height, 50, 50);
        ctx.fillStyle = '#F9C5C6';
        ctx.fill();
        ctx.closePath();
    }
    static drawMoveLeft(player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width - player.move.left, player.height, player.move.left, 50);
        ctx.closePath();

    }
    static drawMoveTop(player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width, player.height - player.move.top, 50, player.move.top);
        ctx.closePath();
    }
    static drawMoveBottom = (player) => {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width, player.height + 50, 50, player.move.down);
        ctx.closePath();

    }
    static drawMoveRight = (player) => {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width + 50, player.height, player.move.right, 50);
        ctx.closePath();

    }
}

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
    "rgba(175, 122, 197,0.5)",
    false
);


console.log('LOG PLAYER 1');
console.log(player1);

console.log('LOG PLAYER 2');
console.log(player2.move);


const makeDataMovePlayer1 = () => {
    Move.MakeDataMoveleft(player1, celuleObstacle)
    Move.MakeDataMoveTop(player1, celuleObstacle)
    Move.MakeDataMoveBottom(player1, celuleObstacle)
    Move.MakeDataMoveRight(player1, celuleObstacle)

}
const makeDataMovePlayer2 = () => {
    Move.MakeDataMoveleft(player2, celuleObstacle)
    Move.MakeDataMoveTop(player2, celuleObstacle)
    Move.MakeDataMoveBottom(player2, celuleObstacle)
    Move.MakeDataMoveRight(player2, celuleObstacle)

}
makeDataMovePlayer1()
makeDataMovePlayer2()
const drawMovement = () => {

    Draw.drawMoveLeft(player1)
    Draw.drawMoveLeft(player2)

    Draw.drawMoveTop(player1)
    Draw.drawMoveTop(player2)

    Draw.drawMoveBottom(player1)
    Draw.drawMoveBottom(player2)

    Draw.drawMoveRight(player1)
    Draw.drawMoveRight(player2)
}


console.log(player1);
console.log(player2);


var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

const fullPlayer = [player1, player2]

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Draw.drawGrid(celuleWidthHeightUpdate2);
    Draw.drawObstacle(celuleObstacle);
    Draw.drawArms(celuleArme);
    Draw.drawPlayer(player1);
    Draw.drawPlayer(player2);


    drawMovement()
    if (player1.play && rightPressed && player1.move.right != 0) {
        player1.width == canvaWidth - 50 ? player1.width = canvaWidth - 50 : player1.width += 50
        player1.move.right -= 50
        player1.move.top = 0
        player1.move.left = 0
        player1.move.down = 0
        rightPressed = false
        if (player1.move.right == 0) {
            player1.play = false
            player2.play = true
            makeDataMovePlayer1()
        }
    }
    if (player2.play && rightPressed && player2.move.right != 0) {
        player2.width == canvaWidth - 50 ? player2.width = canvaWidth - 50 : player2.width += 50
        player2.move.right -= 50
        player2.move.top = 0
        player2.move.left = 0
        player2.move.down = 0
        rightPressed = false

        if (player2.move.right == 0) {
            player2.play = false
            player1.play = true
            makeDataMovePlayer2()

        }
    }


}

console.log('-------  Array player   ------');

console.log(fullPlayer);

setInterval(draw, 10);
/*

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
console.log(celulePlayer);



function keyDownHandler(e) {

    if (e.key == "Right" || e.key == "ArrowRight") {
        for (let index = 0; index < player.length; index++) {
            if (player[0].value = true) {
                if (player[0].move.right != 0) {
                    player[0].width == canvaWidth - 50 ? player[0].width = canvaWidth - 50 : player[0].width += 50
                    player[0].width == canvaWidth - 50 ? player[0].move.right = canvaWidth - 50 : player[0].move.right -= 50

                    moveTopAfterObstacle = 0
                    moveLeftAfterObstacle = 0
                    moveBottomAfterObstacle = 0
                    //console.log(nbrMove);
                    console.log(player[0].move.right);
                } else {
                    player[0].value = false
                }
            } else {
                if (player[1].move.right != 0) {
                    player[1].width == canvaWidth - 50 ? player[1].width = canvaWidth - 50 : player[1].width += 50
                    player[1].width == canvaWidth - 50 ? player[1].move.right = canvaWidth - 50 : player[1].move.right -= 50

                    moveTopAfterObstacle = 0
                    moveLeftAfterObstacle = 0
                    moveBottomAfterObstacle = 0
                    //console.log(nbrMove);
                    console.log(player[1].move.right);

                }
            }
        };
        /* player.forEach(celule => {
             if (celule.id == 0) {

                 if (celule.move.right != 0) {
                     celule.width == canvaWidth - 50 ? celule.width = canvaWidth - 50 : celule.width += 50
                     celule.width == canvaWidth - 50 ? celule.move.right = canvaWidth - 50 : celule.move.right -= 50

                     moveTopAfterObstacle = 0
                     moveLeftAfterObstacle = 0
                     moveBottomAfterObstacle = 0
                     //console.log(nbrMove);
                     console.log(celule.move.right);
                 } else if (celule.move.right == 0) {
                     celule.value = false
                 }

             }



    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        if (moveLeftAfterObstacle != 0) {

            celulePlayer[0].width == 0 ? celulePlayer[0].width = 0 : celulePlayer[0].width -= 50
            celulePlayer[0].width == 0 ? moveLeftAfterObstacle = 0 : moveLeftAfterObstacle -= 50

            moveTopAfterObstacle = 0
            moveRightAfterObstacle = 0
            moveBottomAfterObstacle = 0

        }

    } else if (e.key == "Up" || e.key == "ArrowUp") {
        if (moveTopAfterObstacle != 0) {

            celulePlayer[0].height == 0 ? celulePlayer[0].height = 0 : celulePlayer[0].height -= 50
            celulePlayer[0].height == 0 ? moveTopAfterObstacle = 0 : moveTopAfterObstacle -= 50
            //moveTopAfterObstacle -= 50
            moveBottomAfterObstacle = 0
            moveRightAfterObstacle = 0
            moveLeftAfterObstacle = 0

        }

    } else if (e.key == "Down" || e.key == "ArrowDown") {
        if (moveBottomAfterObstacle != 0) {
            celulePlayer[0].height == canvaHeight - 50 ? celulePlayer[0].height = canvaHeight - 50 : celulePlayer[0].height += 50
            celulePlayer[0].height == canvaHeight - 50 ? moveBottomAfterObstacle = 0 : moveBottomAfterObstacle -= 50
            moveTopAfterObstacle = 0
            moveRightAfterObstacle = 0
            moveLeftAfterObstacle = 0

        }
    }

}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}*/