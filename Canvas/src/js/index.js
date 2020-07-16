import MakeWorld from './MakeWorld';
import Player from './player';
import Move from './move';
import Armes from './arme';
import Draw from './draw';

let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let downPressed = false;
let enterPressed = false;
let spacePressed = false
let gameover = false;
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
let celuleObstacle = MakeWorld.makeDataOfObstacle(20, celuleWidthHeight);
let celuleWidthHeightUpdate = MakeWorld.makeCeluleSafeAfterObstacle(
    celuleWidthHeight,
    celuleObstacle
);
let celuleArme = MakeWorld.makeDataArme(celuleWidthHeightUpdate, 4);
let celuleWidthHeightUpdate2 = MakeWorld.makeCeluleSafeAfterObstacle(
    celuleWidthHeight,
    celuleArme
);

let celulePlayer = MakeWorld.makeDataPlayer(celuleWidthHeightUpdate2, 2);

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

import arme1 from '../assets/img/1.png';
import arme2 from '../assets/img/2.png';
import arme3 from '../assets/img/3.png';
import arme4 from '../assets/img/4.png';

const fullArmes = [{
        name: new Armes(
            'arme1',
            celuleArme[0].width,
            celuleArme[0].height,
            '#8F6787',
            30,
            arme1
        ),
    },
    {
        name: new Armes(
            'arme2',
            celuleArme[1].width,
            celuleArme[1].height,
            '#27242C',
            40,
            arme2
        ),
    },
    {
        name: new Armes(
            'arme3',
            celuleArme[2].width,
            celuleArme[2].height,
            '#A3AD0B',
            20,
            arme3
        ),
    },
    {
        name: new Armes(
            'arme4',
            celuleArme[3].width,
            celuleArme[3].height,
            '#21DE7C',
            50,
            arme4
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
let move = 3;

import three from '../assets/img/New_Piskel.png';
import grass from '../assets/img/grass.png';
import player11 from '../assets/img/player1.png';
import player22 from '../assets/img/player2.png';
import back2 from '../assets/img/grass2.png';
import back3 from '../assets/img/grass3.png';
import heart from '../assets/img/heart.png';
import defaultArme from '../assets/img/0.png';

let img = new Image(); // Crée un nouvel élément img
let imgBack = new Image();
let imgBack2 = new Image();
let imgBack3 = new Image();

let imgPlayer1 = new Image();
let imgPlayer2 = new Image();
let imgHeartPlayer1 = new Image();
let imgHeartPlayer2 = new Image();
let imgdefaultArm = new Image();

function drawback2(ctx) {
    ctx.drawImage(imgBack2, 0, 0, 1000, 500);

    imgBack2.src = back2;
}

function drawback3(ctx) {
    ctx.drawImage(imgBack3, 0, 0, 1000, 500);

    imgBack3.src = back3;
}

function drawArmes(ctx, celules) {
    celules.forEach((arme) => {
        ctx.beginPath();
        ctx.drawImage(
            arme.name.boxImage,
            arme.name.width,
            arme.name.height,
            40,
            40
        );

        arme.name.boxImage.src = arme.name.image;
    });
}

function drawObstacle(ctx, celules) {
    celules.forEach((celule) => {
        //  exécute les instructions drawImage ici
        ctx.drawImage(img, celule.width, celule.height);

        img.src = three;
    });
}
let attack = 'Attack'
let seleteur = '>'


let player1AttackfontsX = 150
let player1AttackfontsY = canvaHeight - 50

let player2AttackfontsX = canvaWidth / 2 + 150
let player2AttackfontsY = canvaHeight - 50

function drawFontAttack(ctx, el, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '25px serif';
    ctx.fillText(el, x, y);
    ctx.closePath();
}

let player1DefensefontsX = 300
let player1DefensefontsY = canvaHeight - 50

let player2DefensefontsX = canvaWidth / 2 + 300
let player2DefensefontsY = canvaHeight - 50

function drawFontDefesense(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '25px serif';
    ctx.fillText(`Defense`, x, y);
    ctx.closePath();
}

let player1SelecteurAttackX = 130
let player1SelecteurAttackY = canvaHeight - 50

let player2SelecteurAttackX = canvaWidth / 2 + 130
let player2SelecteurAttackY = canvaHeight - 50

function drawSelecteurAttack(ctx, el, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '25px serif';
    ctx.fillText(el, x, y);
    ctx.closePath();
}
let player1SelecteurDefenseX = 280
let player1SelecteurDefenseY = canvaHeight - 50

let player2SelecteurDefenseX = canvaWidth / 2 + 280
let player2SelecteurDefenseY = canvaHeight - 50

function drawSelecteurDefense(ctx, el, x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '25px serif';
    ctx.fillText(el, x, y);
    ctx.closePath();
}

function drawBack(ctx) {
    ctx.drawImage(imgBack, 0, 0, 1000, 500);

    imgBack.src = grass;
}

function drawPlayer1(ctx, player) {
    ctx.drawImage(imgPlayer1, player.width, player.height, 50, 50);

    imgPlayer1.src = player11;
}

function drawPlayer2(ctx, player) {
    ctx.drawImage(imgPlayer2, player.width, player.height, 50, 50);

    imgPlayer2.src = player22;
}
let player1FightX = canvaWidth / 2 / 2;
let player1FightY = canvaHeight / 2;

let player2FightX = canvaWidth - canvaWidth / 2 / 2;
let player2FightY = canvaHeight / 2;

function drawplayerFight(img, imgsrc, x, y) {
    ctx.drawImage(img, x, y);
    img.src = imgsrc;

}

Move.makeDataMovePlayer(player1, celuleObstacle, move);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player1.fight == false && player2.fight == false) {


        drawBack(ctx);

        drawObstacle(ctx, celuleObstacle);

        drawArmes(ctx, fullArmes);

        drawPlayer1(ctx, player1);
        drawPlayer2(ctx, player2);

        if (player1.play) {
            Draw.drawMovement(ctx, player1);

            take(player1, fullArmes);
            // move right

            if (rightPressed && player1.move.right != 0) {
                player1.width == canvaWidth - 50 ?
                    (player1.width = canvaWidth - 50) :
                    (player1.width += 50);
                player1.move.right -= 50;

                move <= 0 ? (move = 0) : (move -= 1);
                rightPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);

                console.log(move);
                if (
                    (player1.width == player2.width - 50 &&
                        player1.height == player2.height) ||
                    (player1.width == player2.width &&
                        (player1.height == player2.height + 50 ||
                            player1.height == player2.height - 50))
                ) {
                    player1.fight = true;
                    player2.fight = true;
                    player2.play = false;
                    player1.play = true;
                }

                if (player1.move.right == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3;
                    donTakeArmes(player1);
                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && leftPressed && player1.move.left != 0) {
                player1.width == 0 ? (player1.width = 0) : (player1.width -= 50);
                player1.move.left -= 50;

                move <= 0 ? (move = 0) : (move -= 1);

                donTakeArmes(player1);

                leftPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);

                if (
                    (player1.width == player2.width + 50 &&
                        player1.height == player2.height) ||
                    (player1.width == player2.width &&
                        (player1.height == player2.height + 50 ||
                            player1.height == player2.height - 50))
                ) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true;
                    player2.fight = true;
                    player2.play = false;
                    player1.play = true;
                }
                if (player1.move.left == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3;

                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && topPressed && player1.move.top != 0) {
                player1.height == 0 ? (player1.height = 0) : (player1.height -= 50);
                player1.move.top -= 50;
                move <= 0 ? (move = 0) : (move -= 1);

                topPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);
                if (
                    (player1.height == player2.height + 50 &&
                        player1.width == player2.width) ||
                    (player1.height == player2.height &&
                        (player1.width == player2.width + 50 ||
                            player1.width == player2.width - 50))
                ) {
                    console.log('FUCKING FIGHT');
                    player1.fight = true;
                    player2.fight = true;
                    player2.play = false;
                    player1.play = true;
                }
                if (player1.move.top == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3;

                    donTakeArmes(player1);

                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                }
            }
            if (player1.play && downPressed && player1.move.down != 0) {
                player1.height == canvaHeight - 50 ?
                    (player1.height = canvaHeight - 50) :
                    (player1.height += 50);
                player1.move.down -= 50;

                move <= 0 ? (move = 0) : (move -= 1);

                downPressed = false;
                Move.makeDataMovePlayer(player1, celuleObstacle, move);
                if (
                    (player1.height == player2.height - 50 &&
                        player1.width == player2.width) ||
                    (player1.height == player2.height &&
                        (player1.width == player2.width + 50 ||
                            player1.width == player2.width - 50))
                ) {
                    player1.fight = true;
                    player2.fight = true;
                    player2.play = false;
                    player1.play = true;
                }
                if (player1.move.down == 0 && move == 0) {
                    player1.play = false;
                    player2.play = true;
                    move = 3;

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
                    move = 3;
                    specilaStopTurn(player1, fullArmes);
                    Move.makeDataMovePlayer(player2, celuleObstacle, move);
                    enterPressed = false;
                }
            }
        }
        if (player2.play) {
            Draw.drawMovement(ctx, player2);

            take(player2, fullArmes);

            if (player2.play && rightPressed && player2.move.right != 0) {
                player2.width == canvaWidth - 50 ?
                    (player2.width = canvaWidth - 50) :
                    (player2.width += 50);
                player2.move.right -= 50;
                move <= 0 ? (move = 0) : (move -= 1);

                rightPressed = false;

                Move.makeDataMovePlayer(player2, celuleObstacle, move);
                if (
                    (player2.width == player1.width - 50 &&
                        player2.height == player1.height) ||
                    (player2.width == player1.width &&
                        (player2.height == player1.height + 50 ||
                            player2.height == player1.height - 50))
                ) {
                    player2.play = true;
                    player1.play = false;
                    player1.fight = true;
                    player2.fight = true;

                }
                if (player2.move.right == 0 && move == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3;

                    donTakeArmes(player2);
                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            } // move left

            if (player2.play && leftPressed && player2.move.left != 0) {
                player2.width == 0 ? (player2.width = 0) : (player2.width -= 50);
                player2.move.left -= 50;
                move <= 0 ? (move = 0) : (move -= 1);
                leftPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);
                if (
                    (player2.width == player1.width + 50 &&
                        player2.height == player1.height) ||
                    (player2.width == player1.width &&
                        (player2.height == player1.height + 50 ||
                            player2.height == player1.height - 50))
                ) {
                    player2.play = true;
                    player1.play = false;
                    player1.fight = true;
                    player2.fight = true;

                }
                if (player2.move.left == 0 && move == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3;

                    donTakeArmes(player2);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                }
            } // move top

            if (player2.play && topPressed && player2.move.top != 0) {
                player2.height == 0 ? (player2.height = 0) : (player2.height -= 50);
                player2.move.top -= 50;
                move <= 0 ? (move = 0) : (move -= 1);
                topPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);
                if (
                    (player2.height == player1.height + 50 &&
                        player2.width == player1.width) ||
                    (player2.height == player1.height &&
                        (player2.width == player1.width + 50 ||
                            player2.width == player1.width - 50))
                ) {
                    player2.play = true;
                    player1.play = false;
                    player1.fight = true;
                    player2.fight = true;

                }
                if (player2.move.top == 0 && move == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3;
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
                move <= 0 ? (move = 0) : (move -= 1);

                downPressed = false;
                Move.makeDataMovePlayer(player2, celuleObstacle, move);
                if (
                    (player2.height == player1.height - 50 &&
                        player2.width == player1.width) ||
                    (player2.height == player1.height &&
                        (player2.width == player1.width + 50 ||
                            player2.width == player1.width - 50))
                ) {
                    player2.play = true;
                    player1.play = false;
                    player1.fight = true;
                    player2.fight = true;

                }
                if (player2.move.down == 0 && move == 0) {
                    player2.play = false;
                    player1.play = true;
                    move = 3;

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
                    move = 3;

                    specilaStopTurn(player2, fullArmes);

                    Move.makeDataMovePlayer(player1, celuleObstacle, move);
                    enterPressed = false;
                }
            }
            // Take armes
        }
    } else if (player1.fight && player2.fight) {
        // draw the background phase combat
        drawback2(ctx);

        // draw players phase combat
        drawplayerFight(imgPlayer1, player11, player1FightX, player1FightY)
        drawplayerFight(imgPlayer2, player22, player2FightX, player2FightY)

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(10, canvaHeight - 110, canvaWidth / 2 - 20, 100);
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(
            canvaWidth / 2 + 10,
            canvaHeight - 110,
            canvaWidth / 2 - 25,
            100
        );
        ctx.closePath();

        ctx.drawImage(imgHeartPlayer1, 5, 5, 50, 50);
        imgHeartPlayer1.src = heart;

        ctx.drawImage(imgHeartPlayer2, canvaWidth - 210, 5, 50, 50);
        imgHeartPlayer2.src = heart;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '20px serif';
        ctx.fillText(`100 / ${player1.healh}`, 50, 35);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '20px serif';
        ctx.fillText(`100 / ${player2.healh}`, canvaWidth - 170, 35);
        ctx.closePath();

        ctx.drawImage(imgHeartPlayer1, 5, 5, 50, 50);
        imgHeartPlayer1.src = heart;
        if (player1.arme == undefined) {
            ctx.drawImage(imgdefaultArm, 150, 10, 30, 30);
            imgdefaultArm.src = defaultArme;

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`10`, 190, 35);
            ctx.closePath();
        } else {
            ctx.drawImage(player1.arme.name.boxImage, 150, 11, 30, 30);
            player1.arme.name.boxImage.src = player1.arme.name.image;

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`${player1.arme.name.power}`, 190, 35);
            ctx.closePath();
        }
        if (player2.arme == undefined) {
            ctx.drawImage(imgdefaultArm, canvaWidth - 80, 10, 30, 30);
            imgdefaultArm.src = defaultArme;

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`10`, canvaWidth - 40, 35);
            ctx.closePath();
        } else {
            ctx.drawImage(player2.arme.name.boxImage, canvaWidth - 80, 11, 30, 30);
            player2.arme.name.boxImage.src = player2.arme.name.image;

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`${player2.arme.name.power}`, canvaWidth - 40, 35);
            ctx.closePath();
        }

        drawFontAttack(ctx, attack, player1AttackfontsX, player1AttackfontsY)
        drawFontDefesense(ctx, player1DefensefontsX, player1DefensefontsY)

        drawFontAttack(ctx, attack, player2AttackfontsX, player2AttackfontsY)
        drawFontDefesense(ctx, player2DefensefontsX, player2DefensefontsY)




        if (player1.play) {

            if (player1.attack && player1.play) {
                drawSelecteurAttack(ctx, seleteur, player1SelecteurAttackX, player1SelecteurAttackY)

            } else if (player1.defense) {
                drawSelecteurAttack(ctx, seleteur, player1SelecteurDefenseX, player1SelecteurDefenseY)
            }
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgb(255,215,0)';
            ctx.strokeRect(10, canvaHeight - 110, canvaWidth / 2 - 20, 100);

            ctx.closePath();
            if (rightPressed) {
                player1.attack = false
                player1.defense = true
                rightPressed = false
            } else if (leftPressed) {
                player1.attack = true
                player1.defense = false
                leftPressed = false

            } else if (enterPressed) {
                if (player1.attack) {
                    player1.armor = 0

                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.fillStyle = 'rgb(255,215,0)';
                    ctx.fillRect(canvaWidth / 2, 0, canvaWidth / 2, canvaHeight);
                    ctx.closePath();

                    if (player1.arme == undefined) {
                        player2.healh = (player2.healh + player2.armor) - 10
                    } else {

                        player2.healh = (player2.healh + player2.armor) - player1.arme.name.power
                    }
                    player2.armor = 0
                    player2.play = true
                    player1.play = false
                    enterPressed = false
                }
                if (player1.defense) {
                    if (player2.arme == undefined) {
                        player1.armor = 5

                    } else {
                        player1.armor = player2.arme.name.power / 2
                    }
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
                    ctx.fillRect(0, 0, canvaWidth / 2, canvaHeight);
                    ctx.closePath();
                    player2.play = true
                    player1.play = false
                    enterPressed = false

                }

            }
            if (player2.healh <= 0) {
                player1.fight = false
                gameover = true
            }


        }
        if (player2.play) {
            if (player2.attack && player2.play) {
                drawSelecteurAttack(ctx, seleteur, player2SelecteurAttackX, player2SelecteurAttackY)

            } else if (player2.defense) {
                drawSelecteurAttack(ctx, seleteur, player2SelecteurDefenseX, player2SelecteurDefenseY)
            }
            ctx.beginPath();
            ctx.lineWidth = 5;

            ctx.strokeStyle = 'rgb(255,215,0)';
            ctx.strokeRect(
                canvaWidth / 2 + 10,
                canvaHeight - 110,
                canvaWidth / 2 - 25,
                100
            );
            ctx.closePath();

            ctx.closePath();
            if (rightPressed) {
                player2.attack = false
                player2.defense = true
                rightPressed = false

            } else if (leftPressed) {
                player2.attack = true
                player2.defense = false
                leftPressed = false

            } else if (enterPressed) {
                if (player2.attack) {
                    player2.armor = 0
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(255,215,0)';
                    ctx.fillRect(0, 0, canvaWidth / 2, canvaHeight);
                    ctx.closePath();

                    if (player2.arme == undefined) {
                        player1.healh = (player1.healh + player1.armor) - 10
                    } else {

                        player1.healh = (player1.healh + player1.armor) - player2.arme.name.power
                    }
                    player2.armor = 0

                    player1.play = true
                    player2.play = false
                    enterPressed = false
                }
                if (player2.defense) {
                    if (player1.arme == undefined) {
                        player2.armor = 10 / 2

                    } else {
                        player2.armor = player1.arme.name.power / 2
                    }

                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
                    ctx.fillRect(canvaWidth / 2, 0, canvaWidth / 2, canvaHeight);
                    ctx.closePath();
                    player1.play = true
                    player2.play = false
                    enterPressed = false
                }
            }
            if (player1.healh <= 0) {
                player2.fight = false
                gameover = true
            }

        }
    } else if (gameover = true) {
        drawback3(ctx);

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '50px serif';
        ctx.fillText(`GAME OVER`, canvaWidth / 2, canvaHeight / 2);
        ctx.textAlign = 'center';
        ctx.closePath();
        if (player1.fight == false) {
            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`Player 1 win`, canvaWidth / 2, canvaHeight / 2 + 50);
            ctx.textAlign = 'center';
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.font = '25px serif';
            ctx.fillText(`> Restart`, canvaWidth / 2, canvaHeight / 2 + 90);
            ctx.textAlign = 'center';
            ctx.closePath();

        }
        if (player2.fight == false) {
            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.font = '20px serif';
            ctx.fillText(`Player 2 win`, canvaWidth / 2, canvaHeight / 2 + 50);
            ctx.textAlign = 'center';
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.font = '25px serif';
            ctx.fillText(`> Restart`, canvaWidth / 2, canvaHeight / 2 + 90);
            ctx.textAlign = 'center';
            ctx.closePath();

        }

        if (spacePressed) {

            spacePressed = false

        }

    }
}

console.log('-------  Array player   ------');

console.log(fullPlayer);

//setInterval(draw, 60);
function init() {
    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}
init();