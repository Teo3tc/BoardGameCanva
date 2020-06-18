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

/*ctx.beginPath();
      ctx.rect(width, height, 50, 50);
      ctx.fillStyle = '#FF0000';
      ctx.fill();
      ctx.closePath();
      */
const drawObstacle = (nbrObstacle) => {

    let widthHeight = [];

    for (let index = 0; index < nbrObstacle; index++) {
        widthHeight = celuleWidthHeight[
            Math.floor(Math.random() * celuleWidthHeight.length)
        ]
        celuleObstacle.forEach(checkSameOrNot => {
            while (checkSameOrNot == widthHeight) {
                console.log('Check for find new Celule');

                widthHeight = celuleWidthHeight[
                    Math.floor(Math.random() * celuleWidthHeight.length)
                ]
            }

        });
        celuleObstacle.push(widthHeight)

        ctx.beginPath();
        ctx.rect(widthHeight.width, widthHeight.height, 50, 50);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
    }
    console.log('---TESTE OBSTACLE---');
    console.log(widthHeight);
    console.log(celuleObstacle);
};

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
const drawArme = (nbrArme) => {

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

        ctx.beginPath();
        ctx.rect(widthHeight.width, widthHeight.height, 50, 50);
        ctx.fillStyle = armeColor[index];
        ctx.fill();
        ctx.closePath();
    }
    console.log('---TESTE ARME---');
    console.log(widthHeight);
    console.log(celuleArme);
};
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
const drawPlayer = (nbrPlayer) => {
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

        ctx.beginPath();
        ctx.rect(widthHeight.width, widthHeight.height, 50, 50);
        ctx.fillStyle = '#F9C5C6';
        ctx.fill();
        ctx.closePath();
    }
    console.log('---TESTE Player---');
    console.log(widthHeight);
    console.log(celulePlayer);
};

const drawMoveleft = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width - 50;
    let height = celulePlayer[0].height;
    let move = 'MOVE NORMAL';
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


    console.log(move);
    console.log(width);
    console.log(moveLeftAfterObstacle);
    console.log(moveLeft);

    console.log(saveObstacle);
    let save = celulePlayer[0].width - moveLeftAfterObstacle
    console.log(save);


    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
    ctx.fillRect(save, celulePlayer[0].height, moveLeftAfterObstacle, 50);
    ctx.closePath();
};

const drawMoveTop = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width;
    let height = celulePlayer[0].height - 50;
    let move = 'MOVE NORMAL';
    let saveObstacle = [];
    moveLeftAfterObstacle = 150
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
            moveLeftAfterObstacle = 0
        } else if (moveLeft[0].height != saveObstacle[0]) {
            if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                move = 'MOVE 1';
                moveLeftAfterObstacle = 50
            } else if (moveLeft[1].height != saveObstacle[y]) {
                if (moveLeft[2].height == saveObstacle[y]) {
                    move = 'MOVE 2';
                    moveLeftAfterObstacle = 100
                } else if (
                    moveLeft[2].height != saveObstacle[y] &&
                    moveLeft[1].height != saveObstacle[y]
                ) {
                    move = 'MOVE 3';
                    moveLeftAfterObstacle = 150
                }
            }
        }
    }


    console.log(move);
    console.log(height);
    console.log(moveLeftAfterObstacle);
    console.log(moveLeft);

    console.log(saveObstacle);
    let save = celulePlayer[0].height - moveLeftAfterObstacle
    console.log(save);


    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
    ctx.fillRect(celulePlayer[0].width, save, 50, moveLeftAfterObstacle);
    ctx.closePath();
};
const drawMoveRight = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width + 50;
    let height = celulePlayer[0].height;
    let move = 'MOVE NORMAL';
    let saveObstacle = [];
    moveLeftAfterObstacle = 150
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


    console.log(move);
    console.log(width);
    console.log(moveLeftAfterObstacle);
    console.log(moveLeft);

    console.log(saveObstacle);
    let save = celulePlayer[0].width + 50
    console.log(save);


    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
    ctx.fillRect(save, celulePlayer[0].height, moveLeftAfterObstacle, 50);
    ctx.closePath();
};
const drawMovebottom = () => {
    let moveLeft = [];
    let width = celulePlayer[0].width;
    let height = celulePlayer[0].height + 50;
    let move = 'MOVE NORMAL';
    let saveObstacle = [];
    moveLeftAfterObstacle = 150
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
            moveLeftAfterObstacle = 0
        } else if (moveLeft[0].height != saveObstacle[0]) {
            if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                move = 'MOVE 1';
                moveLeftAfterObstacle = 50
            } else if (moveLeft[1].height != saveObstacle[y]) {
                if (moveLeft[2].height == saveObstacle[y]) {
                    move = 'MOVE 2';
                    moveLeftAfterObstacle = 100
                } else if (
                    moveLeft[2].height != saveObstacle[y] &&
                    moveLeft[1].height != saveObstacle[y]
                ) {
                    move = 'MOVE 3';
                    moveLeftAfterObstacle = 150
                }
            }
        }
    }


    console.log(move);
    console.log(height);
    console.log(moveLeftAfterObstacle);
    console.log(moveLeft);

    console.log(saveObstacle);
    let save = celulePlayer[0].height + 50;
    console.log(save);


    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 250, 0,0.5)';
    ctx.fillRect(celulePlayer[0].width, save, 50, moveLeftAfterObstacle);
    ctx.closePath();
};
makeHeightGridData();
makeWidthGridData();
makeCeluleWidthHeightGrid();

drawGrid();
drawObstacle(40);
makeCeluleSafeAfterObstacle();
drawArme(4);
makeCeluleSafeAfterArme();
drawPlayer(1);
drawMoveleft();
drawMoveTop()
drawMoveRight()
drawMovebottom()
/*drawMoveRight() */