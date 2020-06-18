const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvaWidth = canvas.width;
const canvaHeight = canvas.height;
let armeColor = ['#8F6787', '#27242C', '#A3AD0B', '#21DE7C'];
let celuleWidth = [];
let celuleHeight = [];
let celuleWidthHeight = [];
let celuleObstacle = [];
let celuleArme = [];
let celulePlayer = [];
let celuleSafeAfterObstacle = [];
let celuleSafeAfterArmes = [];

const makeWidthGridData = () => {
    const divisionWidth = canvaWidth / 50;
    console.log(divisionWidth);
    let save = canvaWidth;
    for (let index = 0; index < divisionWidth + 1; index++) {
        celuleWidth.push(save);
        save = save - 50;
    }
    celuleWidth.reverse();
    console.log(celuleWidth);
};
const makeHeightGridData = () => {
    const divisionHeight = canvaHeight / 50;
    console.log(divisionHeight);
    let save = canvaHeight;
    for (let index = 0; index < divisionHeight + 1; index++) {
        celuleHeight.push(save);
        save = save - 50;
    }
    celuleHeight.reverse();
    console.log(celuleHeight);
};
const makeCeluleWidthHeightGrid = () => {
    celuleHeight.forEach((height) => {
        if (height != canvaHeight) {
            celuleWidth.forEach((width) => {
                if (width != canvaWidth) {
                    celuleWidthHeight.push({
                        'value': 'grid',
                        width,
                        height,
                    });
                }
            });
        }
    });
    console.log(celuleWidthHeight);
};

const drawGrid = () => {
    celuleWidthHeight.forEach((gridDraw) => {
        ctx.beginPath();
        ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
        ctx.closePath();
    });
};

const makeDataOfObstacle = (nbrObstacle) => {

    let ObstaclewidthHeight = [];

    for (let index = 0; index < nbrObstacle; index++) {
        ObstaclewidthHeight = celuleWidthHeight[
            Math.floor(Math.random() * celuleWidthHeight.length)
        ]
        celuleObstacle.forEach(checkSameOrNot => {
            while (checkSameOrNot == ObstaclewidthHeight) {
                console.log('Check for find new Celule');

                ObstaclewidthHeight = celuleWidthHeight[
                    Math.floor(Math.random() * celuleWidthHeight.length)
                ]
            }

        });
        celuleObstacle.push(ObstaclewidthHeight)
    }
    return celuleObstacle
};
const drawObstacle = (celules) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.rect(celule.width, celule.height, 50, 50);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
    });
}

const makeCeluleSafeAfterObstacle = () => {
    celuleSafeAfterObstacle = celuleWidthHeight;
    celuleObstacle.forEach((obstacle) => {
        for (let index = 0; index < celuleSafeAfterObstacle.length; index++) {
            if (
                obstacle.width == celuleSafeAfterObstacle[index].width &&
                obstacle.height == celuleSafeAfterObstacle[index].height
            ) {
                celuleSafeAfterObstacle[index].value = 'obastacle'
                /*celuleSafeAfterObstacle.splice(index, 1);*/
            }
        }
    });
    console.log(celuleSafeAfterObstacle);
};
const makeDataOfArme = (nbrArme) => {

    let widthHeight = [];

    for (let index = 0; index < nbrArme; index++) {
        widthHeight = celuleWidthHeight[
            Math.floor(Math.random() * celuleWidthHeight.length)
        ]
        while (widthHeight.value == 'obastacle') {
            console.log('Check for find new Celule for ARME');

            widthHeight = celuleWidthHeight[
                Math.floor(Math.random() * celuleWidthHeight.length)
            ]
        }
        celuleArme.forEach(checkSameOrNot => {
            while (checkSameOrNot == widthHeight) {
                console.log('Check for find new Celule');

                widthHeight = celuleWidthHeight[
                    Math.floor(Math.random() * celuleWidthHeight.length)
                ]
            }
        });
        celuleArme.push(widthHeight)
    }
    return celuleArme
};
const drawArms = (celules) => {
    index = 0
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.rect(celule.width, celule.height, 50, 50);
        ctx.fillStyle = armeColor[index];
        ctx.fill();
        ctx.closePath();
        index += 1
    });
}
const makeCeluleSafeAfterArme = () => {
    celuleSafeAfterArmes = celuleSafeAfterObstacle;
    celuleArme.forEach((armes) => {
        for (let index = 0; index < celuleSafeAfterArmes.length; index++) {
            if (
                armes.width == celuleSafeAfterArmes[index].width &&
                armes.height == celuleSafeAfterArmes[index].height
            ) {
                celuleSafeAfterObstacle[index].value = 'armes'
            }
        }
    });
    console.log(celuleSafeAfterArmes);
};
const makeDataPlayer = (nbrPlayer) => {
    let widthHeight = [];

    for (let index = 0; index < nbrPlayer; index++) {
        widthHeight = celuleWidthHeight[
            Math.floor(Math.random() * celuleWidthHeight.length)
        ]
        while (widthHeight.value == 'obastacle' || widthHeight.value == 'armes') {
            console.log('Check for find new Celule for Player');

            widthHeight = celuleWidthHeight[
                Math.floor(Math.random() * celuleWidthHeight.length)
            ]
        }

        celulePlayer.forEach(checkSameOrNot => {
            while (checkSameOrNot == widthHeight) {
                console.log('Check for find new Celule');

                widthHeight = celuleWidthHeight[
                    Math.floor(Math.random() * celuleWidthHeight.length)
                ]
            }

        });
        celulePlayer.push(widthHeight)


    }
    return celulePlayer
};
const drawPlayer = (celules) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.rect(celule.width, celule.height, 50, 50);
        ctx.fillStyle = '#F9C5C6';
        ctx.fill();
        ctx.closePath();
    });
}
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
    let moveLeft = [];
    let width = celulePlayer[0].width + 50;
    let height = celulePlayer[0].height;
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
    return moveRightAfterObstacle
};
const drawMoveRight = (celules, move) => {
    celules.forEach(celule => {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
        ctx.fillRect(celule.width + 50, celule.height, move, 50);
        ctx.closePath();
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
makeDataPlayer(1)
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
    drawPlayer(celulePlayer);
    drawMoveLeft(celulePlayer, moveLeftAfterObstacle);
    drawMoveTop(celulePlayer, moveTopAfterObstacle)
    drawMoveRight(celulePlayer, moveRightAfterObstacle)
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



function keyDownHandler(e) {

    if (e.key == "Right" || e.key == "ArrowRight") {

        if (moveRightAfterObstacle != 0) {
            celulePlayer[0].width == canvaWidth - 50 ? celulePlayer[0].width = canvaWidth - 50 : celulePlayer[0].width += 50
            celulePlayer[0].width == canvaWidth - 50 ? moveRightAfterObstacle = canvaWidth - 50 : moveRightAfterObstacle -= 50



            moveTopAfterObstacle = 0
            moveLeftAfterObstacle = 0
            moveBottomAfterObstacle = 0
            console.log(nbrMove);
            console.log(moveRightAfterObstacle);

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
}