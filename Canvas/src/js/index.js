import MakeWorld from './MakeWorld'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvaWidth = canvas.width;
const canvaHeight = canvas.height;
let armeColor = ['#8F6787', '#27242C', '#A3AD0B', '#21DE7C'];






const celuleWidth = MakeWorld.makeGridData(canvaWidth);
const celuleHeight = MakeWorld.makeGridData(canvaHeight);
const celuleWidthHeight = MakeWorld.makeCeluleWidthHeightGrid(celuleHeight, celuleWidth, canvaWidth, canvaHeight);
const celuleObstacle = MakeWorld.makeDataOfObstacle(20, celuleWidthHeight);
const celuleWidthHeightUpdate = MakeWorld.makeCeluleSafeAfterObstacle(celuleWidthHeight, celuleObstacle)
const celuleArme = MakeWorld.makeDataOfObstacle(4, celuleWidthHeight);
const celuleWidthHeightUpdate2 = MakeWorld.makeCeluleSafeAfterObstacle(celuleWidthHeight, celuleArme)

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
class Player {
    constructor(width, height, up, down, left, right) {
        this.width = width;
        this.height = height;
        this.move = {
            up: up,
            down: down,
            left: left,
            right: right
        };

    }
}
class Draw {
    static drawGrid(celule) {
        celule.forEach((gridDraw) => {
            ctx.beginPath();
            ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
            ctx.closePath();
        });
    }
    static drawObstacle(celules) {
        celules.forEach(celule => {
            ctx.beginPath();
            ctx.rect(celule.width, celule.height, 50, 50);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.closePath();
        });
    }
    static drawArms(celules) {
        let index = 0
        celules.forEach(celule => {
            ctx.beginPath();
            ctx.rect(celule.width, celule.height, 50, 50);
            ctx.fillStyle = armeColor[index];
            ctx.fill();
            ctx.closePath();
            index += 1
        });
    }
    static drawPlayer(player) {
        ctx.beginPath();
        ctx.rect(player.width, player.height, 50, 50);
        ctx.fillStyle = '#F9C5C6';
        ctx.fill();
        ctx.closePath();
    }
}

const player1 = new Player(celulePlayer[0].width, celulePlayer[0].height, 0, 0, 0, 0)
const player2 = new Player(celulePlayer[1].width, celulePlayer[1].height, 0, 0, 0, 0)


const drawGrid = Draw.drawGrid(celuleWidthHeightUpdate2)
const drawObactacle = Draw.drawObstacle(celuleObstacle)
const drawArms = Draw.drawArms(celuleArme)
const drawPlayer1 = Draw.drawPlayer(player1)
const drawPlayer2 = Draw.drawPlayer(player2)

drawGrid
drawObactacle
drawArms



console.log(' LOG PLAYER 1');
console.log(player1);

console.log(' LOG PLAYER 2');
console.log(player2);
/*


let moveLeftAfterObstacle = 0
const MakeDataMoveleft = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width - 50;
    let height = celulePlayer[0].height;
    let saveObstacle = [];
    moveLeftAfterObstacle = 150
    for (let index = 0; index < 3; index++) {
        moveLeft.push({
            width,
            height
        })
        width = width - 50
        celuleObstacle.forEach(obstacle => {
            if (obstacle.width == moveLeft[index].width && obstacle.height == moveLeft[index].height) {
                saveObstacle.push(obstacle.width)
            }
        });

    }
    for (let y = 0; y < saveObstacle.length; y++) {
        if (moveLeft[0].width == saveObstacle[0]) {
            move = 'CANT MOVE';
            moveLeftAfterObstacle = 0
        } else if (moveLeft[0].width != saveObstacle[0]) {
            if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0]) {
                move = 'MOVE 1';
                moveLeftAfterObstacle = 50
            } else if (moveLeft[1].width != saveObstacle[y]) {
                if (moveLeft[2].width == saveObstacle[y]) {
                    move = 'MOVE 2';
                    moveLeftAfterObstacle = 100
                } else if (
                    moveLeft[2].width != saveObstacle[y] &&
                    moveLeft[1].width != saveObstacle[y]
                ) {
                    move = 'MOVE 3';
                    moveLeftAfterObstacle = 150
                }
            }
        }
    }
};
const drawMoveLeft = (celules, move) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
        ctx.fillRect(celule.width - move, celule.height, move, 50);
        ctx.closePath();
    });
}
let moveTopAfterObstacle = 0
const MakeDataMoveTop = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width;
    let height = celulePlayer[0].height - 50;
    let saveObstacle = [];
    moveTopAfterObstacle = 150
    for (let index = 0; index < 3; index++) {
        moveLeft.push({
            width,
            height
        })
        height = height - 50
        celuleObstacle.forEach(obstacle => {
            if (obstacle.height == moveLeft[index].height && obstacle.width == moveLeft[index].width) {
                saveObstacle.push(obstacle.height)
            }
        });

    }
    for (let y = 0; y < saveObstacle.length; y++) {
        if (moveLeft[0].height == saveObstacle[0]) {
            move = 'CANT MOVE';
            moveTopAfterObstacle = 0
        } else if (moveLeft[0].height != saveObstacle[0]) {
            if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                move = 'MOVE 1';
                moveTopAfterObstacle = 50
            } else if (moveLeft[1].height != saveObstacle[y]) {
                if (moveLeft[2].height == saveObstacle[y]) {
                    move = 'MOVE 2';
                    moveTopAfterObstacle = 100
                } else if (
                    moveLeft[2].height != saveObstacle[y] &&
                    moveLeft[1].height != saveObstacle[y]
                ) {
                    move = 'MOVE 3';
                    moveTopAfterObstacle = 150
                }
            }
        }
    }



    let save = celulePlayer[0].height - moveTopAfterObstacle;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
    ctx.fillRect(celulePlayer[0].width, save, 50, moveTopAfterObstacle);
    ctx.closePath();
};
const drawMoveTop = (celules, move) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
        ctx.fillRect(celule.width, celule.height - move, 50, move);
        ctx.closePath();
    });
}
let moveRightAfterObstacle = 0
const MakeDataMoveRight = () => {
    let i = 0
    player.forEach(celule => {
        let moveLeft = [];
        let width = celule.width + 50;
        let height = celule.height;
        let saveObstacle = [];
        moveRightAfterObstacle = 150
        for (let index = 0; index < 3; index++) {
            moveLeft.push({
                width,
                height
            })
            width = width + 50
            celuleObstacle.forEach(obstacle => {
                if (obstacle.width == moveLeft[index].width && obstacle.height == moveLeft[index].height) {
                    saveObstacle.push(obstacle.width)
                }
            });

        }
        for (let y = 0; y < saveObstacle.length; y++) {
            if (moveLeft[0].width == saveObstacle[0]) {
                move = 'CANT MOVE';
                moveRightAfterObstacle = 0
            } else if (moveLeft[0].width != saveObstacle[0]) {
                if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0]) {
                    move = 'MOVE 1';
                    moveRightAfterObstacle = 50
                } else if (moveLeft[1].width != saveObstacle[y]) {
                    if (moveLeft[2].width == saveObstacle[y]) {
                        move = 'MOVE 2';
                        moveRightAfterObstacle = 100
                    } else if (
                        moveLeft[2].width != saveObstacle[y] &&
                        moveLeft[1].width != saveObstacle[y]
                    ) {
                        move = 'MOVE 3';
                        moveRightAfterObstacle = 150
                    }
                }
            }
        }
        celule.move.right = moveRightAfterObstacle
    });

    return moveRightAfterObstacle

};
console.log('fuck ');

console.log(player);

const drawMoveRight = (celules) => {
    let i = 0
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
        ctx.fillRect(celule.width + 50, celule.height, celule.move.right, 50);
        ctx.closePath();
        i = i + 1
    });
}
let moveBottomAfterObstacle = 0

const MakeDataMovebottom = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width;
    let height = celulePlayer[0].height + 50;
    let move = 'MOVE NORMAL';
    let saveObstacle = [];
    moveBottomAfterObstacle = 150
    for (let index = 0; index < 3; index++) {
        moveLeft.push({
            width,
            height
        })
        height = height + 50
        celuleObstacle.forEach(obstacle => {
            if (obstacle.height == moveLeft[index].height && obstacle.width == moveLeft[index].width) {
                saveObstacle.push(obstacle.height)
            }
        });

    }
    for (let y = 0; y < saveObstacle.length; y++) {
        if (moveLeft[0].height == saveObstacle[0]) {
            move = 'CANT MOVE';
            moveBottomAfterObstacle = 0
        } else if (moveLeft[0].height != saveObstacle[0]) {
            if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                move = 'MOVE 1';
                moveBottomAfterObstacle = 50
            } else if (moveLeft[1].height != saveObstacle[y]) {
                if (moveLeft[2].height == saveObstacle[y]) {
                    move = 'MOVE 2';
                    moveBottomAfterObstacle = 100
                } else if (
                    moveLeft[2].height != saveObstacle[y] &&
                    moveLeft[1].height != saveObstacle[y]
                ) {
                    move = 'MOVE 3';
                    moveBottomAfterObstacle = 150
                }
            }
        }
    }


};


const drawMovebottom = (celules, move) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
        ctx.fillRect(celule.width, celule.height + 50, 50, move);
        ctx.closePath();
    });
}
makeHeightGridData();
makeWidthGridData();
makeCeluleWidthHeightGrid();

makeDataOfObstacle(40)
makeCeluleSafeAfterObstacle();
makeDataOfArme(4)
makeCeluleSafeAfterArme();
makeDataPlayer(2)
MakeDataMoveleft()
MakeDataMoveTop()
MakeDataMoveRight()
MakeDataMovebottom()
var rightPressed = false;
var leftPressed = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawObstacle(celuleObstacle);
    drawArms(celuleArme)
    drawPlayer(player);
    drawMoveLeft(celulePlayer, moveLeftAfterObstacle);
    drawMoveTop(celulePlayer, moveTopAfterObstacle)
    drawMoveRight(player)
    drawMovebottom(celulePlayer, moveBottomAfterObstacle)
    if (rightPressed) {
        paddleX += 50;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 50;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}
setInterval(draw, 100);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
console.log(celulePlayer);

celulePlayer[0].value = true
celulePlayer[1].value = false

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