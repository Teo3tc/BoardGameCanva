import MakeWorld from "./MakeWorld";
import Player from "./player";
import Move from "./move";
import Armes from "./arme"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvaWidth = canvas.width;
const canvaHeight = canvas.height;
let armeColor = ["#8F6787", "#27242C", "#A3AD0B", "#21DE7C"];

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

console.log("width TABLEAU");
console.log(celuleWidth);
console.log("Height TABLEAU");
console.log(celuleHeight);

console.log("width & height TABLEAU OBJECT");
console.log(celuleWidthHeight);
console.log(" Update width & height TABLEAU OBJECT");
console.log(celuleWidthHeightUpdate);

console.log("celule Obestacle");
console.log(celuleObstacle);

console.log("celule Arme");
console.log(celuleArme);

console.log(" Update width & height TABLEAU OBJECT");
console.log(celuleWidthHeightUpdate2);

console.log(" CELULE PLAYER");
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
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
        });
    }
    static drawArms(armes) {
        armes.forEach(arme => {

            ctx.beginPath();
            ctx.rect(arme.name.width, arme.name.height, 50, 50);
            ctx.fillStyle = arme.name.color;
            ctx.fill();
            ctx.closePath();
        });

    }
    static drawPlayer(player) {
        ctx.beginPath();
        ctx.rect(player.width, player.height, 50, 50);
        ctx.fillStyle = "#F9C5C6";
        ctx.fill();
        ctx.closePath();
    }
    static drawMoveLeft(player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(
            player.width - player.move.left,
            player.height,
            player.move.left,
            50
        );
        ctx.closePath();
    }
    static drawMoveTop(player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(
            player.width,
            player.height - player.move.top,
            50,
            player.move.top
        );
        ctx.closePath();
    }
    static drawMoveBottom = (player) => {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width, player.height + 50, 50, player.move.down);
        ctx.closePath();
    };
    static drawMoveRight = (player) => {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width + 50, player.height, player.move.right, 50);
        ctx.closePath();
    };
}

const player1 = new Player(
    celulePlayer[0].width,
    celulePlayer[0].height,
    0,
    0,
    0,
    0,
    "rgba(125, 206, 160,0.5)",
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

const fullArmes = [{
    name: new Armes('arme1', celuleArme[0].width, celuleArme[0].height, "#8F6787", 50)
}, {
    name: new Armes('arme2', celuleArme[1].width, celuleArme[1].height, "#27242C", 100)
}, {
    name: new Armes('arme3', celuleArme[2].width, celuleArme[2].height, "#A3AD0B", 20)
}, {
    name: new Armes('arme4', celuleArme[3].width, celuleArme[3].height, "#21DE7C", 70)
}]
console.log('LOG ARRAY ARMES');
console.log(fullArmes);

console.log("LOG PLAYER 1");
console.log(player1);

console.log("LOG PLAYER 2");
console.log(player2.move);



Move.makeDataMovePlayer(player1, celuleObstacle);
const drawMovement = () => {
    Draw.drawMoveLeft(player1);
    Draw.drawMoveLeft(player2);

    Draw.drawMoveTop(player1);
    Draw.drawMoveTop(player2);

    Draw.drawMoveBottom(player1);
    Draw.drawMoveBottom(player2);

    Draw.drawMoveRight(player1);
    Draw.drawMoveRight(player2);
};

var rightPressed = false;
var leftPressed = false;
var topPressed = false;
var downPressed = false;
var enterPressed = false;
var spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
                player.arme = arms
                console.log(player.arme);
                armes.splice(index, 1)
                console.log(index);
                player.gun = 1
                console.log(player.gun);
            } else if (player.gun == 1) {
                console.log('CHANGE');
                player.arme.name.width = player.width
                player.arme.name.height = player.height
                armes.push(player.arme)
                player.arme = arms
                armes.splice(index, 1)
                player.gun = 2

            }
        }
    });

}

function specilaStopTurn(player, armes) {
    armes.forEach(arme => {
        if (player.width != arme.name.width && player.height != arme.name.height) {
            if (player.gun != 0) {
                player.gun == 2 ? player.gun = 1 : player.gun = 1
                console.log(player.gun);
            }
        }

    });
}

function donTakeArmes(player) {
    if (player.gun != 0) {
        player.gun == 2 ? player.gun = 1 : player.gun = 1
        console.log(player.gun);
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Draw.drawGrid(celuleWidthHeightUpdate2);
    Draw.drawObstacle(celuleObstacle);
    Draw.drawArms(fullArmes)
    Draw.drawPlayer(player1);
    Draw.drawPlayer(player2);

    drawMovement();
    take(player1, fullArmes)

    // move right
    if (player1.play && rightPressed && player1.move.right != 0) {
        player1.width == canvaWidth - 50 ?
            (player1.width = canvaWidth - 50) :
            (player1.width += 50);
        player1.move.right -= 50;
        player1.move.top = 0;
        player1.move.left = 0;
        player1.move.down = 0;

        rightPressed = false;


        if (player1.move.right == 0) {
            player1.play = false;
            player2.play = true;
            donTakeArmes(player1)
            Move.makeDataMovePlayer(player2, celuleObstacle);
        }
    }
    if (player2.play && rightPressed && player2.move.right != 0) {
        player2.width == canvaWidth - 50 ?
            (player2.width = canvaWidth - 50) :
            (player2.width += 50);
        player2.move.right -= 50;
        player2.move.top = 0;
        player2.move.left = 0;
        player2.move.down = 0;
        take(player2, fullArmes)

        rightPressed = false;

        if (player2.move.right == 0) {
            player2.play = false;
            player1.play = true;
            donTakeArmes(player2)
            Move.makeDataMovePlayer(player1, celuleObstacle);
        }
    } // move left
    if (player1.play && leftPressed && player1.move.left != 0) {
        player1.width == 0 ?
            (player1.width = 0) :
            (player1.width -= 50);
        player1.move.left -= 50;
        player1.move.top = 0;
        player1.move.right = 0;
        player1.move.down = 0;
        donTakeArmes(player1)

        leftPressed = false;

        if (player1.move.left == 0) {
            player1.play = false;
            player2.play = true;
            donTakeArmes(player2)

            Move.makeDataMovePlayer(player2, celuleObstacle);
        }
    }
    if (player2.play && leftPressed && player2.move.left != 0) {
        player2.width == 0 ?
            (player2.width = 0) :
            (player2.width -= 50);
        player2.move.left -= 50;
        player2.move.top = 0;
        player2.move.right = 0;
        player2.move.down = 0;
        take(player2, fullArmes)

        leftPressed = false;

        if (player2.move.left == 0) {
            player2.play = false;
            player1.play = true;
            donTakeArmes(player2)

            Move.makeDataMovePlayer(player1, celuleObstacle);
        }
    } // move top
    if (player1.play && topPressed && player1.move.top != 0) {
        player1.height == 0 ?
            (player1.height = 0) :
            (player1.height -= 50);
        player1.move.top -= 50;
        player1.move.down = 0;
        player1.move.right = 0;
        player1.move.left = 0;

        topPressed = false;

        if (player1.move.top == 0) {
            player1.play = false;
            player2.play = true;
            donTakeArmes(player1)

            Move.makeDataMovePlayer(player2, celuleObstacle);
        }
    }
    if (player2.play && topPressed && player2.move.top != 0) {
        player2.height == 0 ?
            (player2.height = 0) :
            (player2.height -= 50);
        player2.move.top -= 50;
        player2.move.down = 0;
        player2.move.right = 0;
        player2.move.left = 0;
        take(player2, fullArmes)

        topPressed = false

        if (player2.move.top == 0) {

            player2.play = false;
            player1.play = true;
            player2.gun == 2 ? player2.gun = 1 : player2.gun = 0
            donTakeArmes(player2)

            Move.makeDataMovePlayer(player1, celuleObstacle);
        }
    }
    // move down
    if (player1.play && downPressed && player1.move.down != 0) {
        player1.height == canvaHeight - 50 ?
            (player1.height = canvaHeight - 50) :
            (player1.height += 50);
        player1.move.down -= 50;
        player1.move.top = 0;
        player1.move.left = 0;
        player1.move.right = 0;

        downPressed = false;

        if (player1.move.down == 0) {
            player1.play = false;
            player2.play = true;
            donTakeArmes(player1)

            Move.makeDataMovePlayer(player2, celuleObstacle);
        }
    }
    if (player2.play && downPressed && player2.move.down != 0) {
        player2.height == canvaHeight - 50 ?
            (player2.height = canvaHeight - 50) :
            (player2.height += 50);
        player2.move.down -= 50;
        player2.move.top = 0;
        player2.move.left = 0;
        player2.move.right = 0;
        take(player2, fullArmes)

        downPressed = false;

        if (player2.move.down == 0) {
            player2.play = false;
            player1.play = true;
            donTakeArmes(player2)

            Move.makeDataMovePlayer(player1, celuleObstacle);
        }
    }
    // stop turn 
    if (player1.play && enterPressed) {
        player1.move.down = 0;
        player1.move.top = 0;
        player1.move.left = 0;
        player1.move.right = 0;

        if (player1.move.down == 0) {
            player1.play = false;
            player2.play = true;
            specilaStopTurn(player1, fullArmes)
            Move.makeDataMovePlayer(player2, celuleObstacle);
            enterPressed = false;

        }
    }
    if (player2.play && enterPressed) {
        player2.move.down = 0;
        player2.move.top = 0;
        player2.move.left = 0;
        player2.move.right = 0;
        if (player2.move.down == 0) {
            player2.play = false;
            player1.play = true;
            specilaStopTurn(player2, fullArmes)

            Move.makeDataMovePlayer(player1, celuleObstacle);
            enterPressed = false;

        }
    }
    // Take armes

}

console.log("-------  Array player   ------");

console.log(fullPlayer);

setInterval(draw, 10);