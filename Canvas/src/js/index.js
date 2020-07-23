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
let move = 3;

import arme1 from '../assets/img/1.png';
import arme2 from '../assets/img/2.png';
import arme3 from '../assets/img/3.png';
import arme4 from '../assets/img/4.png';

import three from '../assets/img/New_Piskel.png';
import back1 from '../assets/img/grass.png';
import player11 from '../assets/img/player1.png';
import player22 from '../assets/img/player2.png';
import back2 from '../assets/img/grass2.png';
import back3 from '../assets/img/grass3.png';
import heart from '../assets/img/heart.png';
import defaultArme from '../assets/img/0.png';

const imgObastacle = new Image();
const imgBack = new Image();


const imgPlayer1 = new Image();
const imgPlayer2 = new Image();
const imgHeartPlayer1 = new Image();
const imgHeartPlayer2 = new Image();
const imgdefaultArm = new Image();


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
const celuleObstacle = MakeWorld.makeDataOfObstacle(20, celuleWidthHeight);
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

function drawSelecteur(ctx, el, x, y) {
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


let player1FightX = canvaWidth / 2 / 2;
let player1FightY = canvaHeight / 2;

let player2FightX = canvaWidth - canvaWidth / 2 / 2;
let player2FightY = canvaHeight / 2;

function drawplayerFight(img, imgsrc, x, y) {
    ctx.drawImage(img, x, y);
    img.src = imgsrc;

}

function clickRight(e, playerMove, playerWait) {
    if (e.offsetY >= playerMove.height && e.offsetY <= playerMove.height + 50) {

        if (playerMove.move.right != 0 && e.offsetX >= playerMove.width + 50 && e.offsetX <= playerMove.width + 100) {

            playerMove.width == canvaWidth - 50 ?
                (playerMove.width = canvaWidth - 50) :
                (playerMove.width += 50);
            playerMove.move.right -= 50;
            move <= 0 ? (move = 0) : (move -= 1);
            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

            console.log(move);
            // check if playerMove is in area of playerWait for change to phase fight 
            if (
                (playerMove.width == playerWait.width - 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                // change to phase Fight 
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            // check if move finish
            if (playerMove.move.right == 0 && move == 0) {
                // playerMove end of turn 
                playerMove.play = false;
                // playerWait Start of turn 
                playerWait.play = true;
                // reset move 
                move = 3;
                Armes.donTakeArmes(playerMove);
                // make the data  of movement playerWait 
                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.right != 0 && e.offsetX >= playerMove.width + 100 && e.offsetX <= playerMove.width + 150) {

            playerMove.width == canvaWidth - 50 ?
                (playerMove.width = canvaWidth - 50) :
                (playerMove.width += 100);
            playerMove.move.right -= 100;
            move <= 0 ? (move = 0) : (move -= 2);
            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

            console.log(move);
            // check if playerMove is in area of playerWait for change to phase fight 
            if (
                (playerMove.width == playerWait.width - 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                // change to phase Fight 
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            // check if move finish
            if (playerMove.move.right == 0 && move == 0) {
                // playerMove end of turn 
                playerMove.play = false;
                // playerWait Start of turn 
                playerWait.play = true;
                // reset move 
                move = 3;
                Armes.donTakeArmes(playerMove);
                // make the data  of movement playerWait 
                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.right != 0 && e.offsetX >= playerMove.width + 150 && e.offsetX <= playerMove.width + 200) {

            playerMove.width == canvaWidth - 50 ?
                (playerMove.width = canvaWidth - 50) :
                (playerMove.width += 150);
            playerMove.move.right -= 150;
            move <= 0 ? (move = 0) : (move -= 3);
            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

            console.log(move);
            // check if playerMove is in area of playerWait for change to phase fight 
            if (
                (playerMove.width == playerWait.width - 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                // change to phase Fight 
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            // check if move finish
            // playerMove end of turn 
            playerMove.play = false;
            // playerWait Start of turn 
            playerWait.play = true;
            // reset move 
            move = 3;
            Armes.donTakeArmes(playerMove);
            // make the data  of movement playerWait 
            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);

        }
    }
}

function clickLeft(e, playerMove, playerWait) {
    if (e.offsetY >= playerMove.height && e.offsetY <= playerMove.height + 50) {


        if (playerMove.move.left != 0 && e.offsetX <= playerMove.width && e.offsetX >= playerMove.width - 50) {

            playerMove.width == 0 ? (playerMove.width = 0) : (playerMove.width -= 50);
            playerMove.move.left -= 50;

            move <= 0 ? (move = 0) : (move -= 1);


            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

            if (
                (playerMove.width == playerWait.width + 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.left == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.left != 0 && e.offsetX <= playerMove.width - 50 && e.offsetX >= playerMove.width - 100) {

            playerMove.width == 0 ? (playerMove.width = 0) : (playerMove.width -= 100);
            playerMove.move.left -= 100;

            move <= 0 ? (move = 0) : (move -= 2);


            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

            if (
                (playerMove.width == playerWait.width + 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.left == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.left != 0 && e.offsetX <= playerMove.width - 100 && e.offsetX >= playerMove.width - 150) {

            playerMove.width == 0 ? (playerMove.width = 0) : (playerMove.width -= 150);
            playerMove.move.left -= 150;

            move <= 0 ? (move = 0) : (move -= 3);


            Move.makeDataMovePlayer(playerMove, playerWait, playerMove, celuleObstacle, move);

            if (
                (playerMove.width == playerWait.width + 50 &&
                    playerMove.height == playerWait.height) ||
                (playerMove.width == playerWait.width &&
                    (playerMove.height == playerWait.height + 50 ||
                        playerMove.height == playerWait.height - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);

        }
    }
}

function clickDown(e, playerMove, playerWait) {
    if (e.offsetX >= playerMove.width && e.offsetX <= playerMove.width + 50) {

        if (playerMove.move.down != 0 && e.offsetY >= playerMove.height + 50 && e.offsetY <= playerMove.height + 100) {

            playerMove.height == canvaHeight - 50 ?
                (playerMove.height = canvaHeight - 50) :
                (playerMove.height += 50);
            playerMove.move.down -= 50;

            move <= 0 ? (move = 0) : (move -= 1);

            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height - 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.down == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.down != 0 && e.offsetY >= playerMove.height + 100 && e.offsetY <= playerMove.height + 150) {

            playerMove.height == canvaHeight - 50 ?
                (playerMove.height = canvaHeight - 50) :
                (playerMove.height += 100);
            playerMove.move.down -= 100;

            move <= 0 ? (move = 0) : (move -= 2);

            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height - 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.down == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
            }
        } else if (playerMove.move.down != 0 && e.offsetY >= playerMove.height + 150 && e.offsetY <= playerMove.height + 200) {

            playerMove.height == canvaHeight - 50 ?
                (playerMove.height = canvaHeight - 50) :
                (playerMove.height += 150);
            playerMove.move.down -= 150;

            move <= 0 ? (move = 0) : (move -= 3);

            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height - 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);

        }
    }
}

function clickTop(e, playerMove, playerWait) {
    if (e.offsetX >= playerMove.width && e.offsetX <= playerMove.width + 50) {

        if (playerMove.move.top != 0 && e.offsetY <= playerMove.height && e.offsetY >= playerMove.height - 50) {

            playerMove.height == 0 ? (playerMove.height = 0) : (playerMove.height -= 50);
            playerMove.move.top -= 50;
            move <= 0 ? (move = 0) : (move -= 1);

            Move.makeDataMovePlayer(playerMove, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height + 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                console.log('FUCKING FIGHT');
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.top == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, celuleObstacle, move);
            }
        } else if (playerMove.move.top != 0 && e.offsetY <= playerMove.height - 50 && e.offsetY >= playerMove.height - 100) {

            playerMove.height == 0 ? (playerMove.height = 0) : (playerMove.height -= 100);
            playerMove.move.top -= 100;
            move <= 0 ? (move = 0) : (move -= 2);

            Move.makeDataMovePlayer(playerMove, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height + 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                console.log('FUCKING FIGHT');
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            if (playerMove.move.top == 0 && move == 0) {
                playerMove.play = false;
                playerWait.play = true;
                move = 3;

                Armes.donTakeArmes(playerMove);

                Move.makeDataMovePlayer(playerWait, celuleObstacle, move);
            }
        } else if (playerMove.move.top != 0 && e.offsetY <= playerMove.height - 100 && e.offsetY >= playerMove.height - 150) {

            playerMove.height == 0 ? (playerMove.height = 0) : (playerMove.height -= 150);
            playerMove.move.top -= 150;
            move <= 0 ? (move = 0) : (move -= 3);

            Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
            if (
                (playerMove.height == playerWait.height + 50 &&
                    playerMove.width == playerWait.width) ||
                (playerMove.height == playerWait.height &&
                    (playerMove.width == playerWait.width + 50 ||
                        playerMove.width == playerWait.width - 50))
            ) {
                console.log('FUCKING FIGHT');
                playerMove.fight = true;
                playerWait.fight = true;
                playerWait.play = false;
                playerMove.play = true;
            }
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);

        }
    }
}


canvas.addEventListener('click', (e) => {
    if (player1.fight == false && player2.fight == false) {

        if (player1.play) {

            clickRight(e, player1, player2)
            clickLeft(e, player1, player2)
            clickDown(e, player1, player2)
            clickTop(e, player1, player2)
        } else {

            clickRight(e, player2, player1)
            clickLeft(e, player2, player1)
            clickDown(e, player2, player1)
            clickTop(e, player2, player1)


        }
    } else if (player1.fight && player2.fight) {
        console.log(e.offsetX);
        console.log(e.offsetY);
        if (player1.play) {
            if (e.offsetY >= player1SelecteurAttackY - 20 && e.offsetY <= player1SelecteurAttackY + 20) {

                if (e.offsetX >= player1SelecteurAttackX && e.offsetX <= player1SelecteurAttackX + 80) {
                    leftPressed = true
                    enterPressed = true
                    console.log('ATTACK');
                } else if (e.offsetX >= player1SelecteurDefenseX && e.offsetX <= player1SelecteurDefenseX + 80) {
                    rightPressed = true
                    enterPressed = true
                }
            }
        } else {
            if (e.offsetY >= player2SelecteurAttackY - 20 && e.offsetY <= player2SelecteurAttackY + 20) {

                if (e.offsetX >= player2SelecteurAttackX && e.offsetX <= player2SelecteurAttackX + 80) {
                    leftPressed = true
                    enterPressed = true
                    console.log('ATTACK');
                } else if (e.offsetX >= player2SelecteurDefenseX && e.offsetX <= player2SelecteurDefenseX + 80) {
                    rightPressed = true
                    enterPressed = true
                }
            }
        }
    } else if (gameover = true) {
        window.location.reload();
    }
});


Move.makeDataMovePlayer(player1, player2, celuleObstacle, move);

function movePlayerPressRight(side, playerMove, playerWait) {
    // check if possibility to move right 
    if (side && playerMove.move.right != 0) {
        playerMove.width == canvaWidth - 50 ?
            (playerMove.width = canvaWidth - 50) :
            (playerMove.width += 50);
        playerMove.move.right -= 50;

        move <= 0 ? (move = 0) : (move -= 1);
        Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

        console.log(move);
        // check if playerMove is in area of playerWait for change to phase fight 
        if (
            (playerMove.width == playerWait.width - 50 &&
                playerMove.height == playerWait.height) ||
            (playerMove.width == playerWait.width &&
                (playerMove.height == playerWait.height + 50 ||
                    playerMove.height == playerWait.height - 50))
        ) {
            // change to phase Fight 
            playerMove.fight = true;
            playerWait.fight = true;
            playerWait.play = false;
            playerMove.play = true;
        }
        // check if move finish
        if (playerMove.move.right == 0 && move == 0) {
            // playerMove end of turn 
            playerMove.play = false;
            // playerWait Start of turn 
            playerWait.play = true;
            // reset move 
            move = 3;
            Armes.donTakeArmes(playerMove);
            // make the data  of movement playerWait 
            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
        }
    }
}

function movePlayerPressLeft(side, playerMove, playerWait) {
    // check if possibility to move Left 
    if (playerMove.play && side && playerMove.move.left != 0) {
        playerMove.width == 0 ? (playerMove.width = 0) : (playerMove.width -= 50);
        playerMove.move.left -= 50;

        move <= 0 ? (move = 0) : (move -= 1);


        Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);

        if (
            (playerMove.width == playerWait.width + 50 &&
                playerMove.height == playerWait.height) ||
            (playerMove.width == playerWait.width &&
                (playerMove.height == playerWait.height + 50 ||
                    playerMove.height == playerWait.height - 50))
        ) {
            console.log('FUCKING FIGHT');
            playerMove.fight = true;
            playerWait.fight = true;
            playerWait.play = false;
            playerMove.play = true;
        }
        if (playerMove.move.left == 0 && move == 0) {
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
        }
    }
}

function movePlayerPressTop(side, playerMove, playerWait) {
    // check if possibility to move TOP 
    if (playerMove.play && side && playerMove.move.top != 0) {
        playerMove.height == 0 ? (playerMove.height = 0) : (playerMove.height -= 50);
        playerMove.move.top -= 50;
        move <= 0 ? (move = 0) : (move -= 1);

        Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
        if (
            (playerMove.height == playerWait.height + 50 &&
                playerMove.width == playerWait.width) ||
            (playerMove.height == playerWait.height &&
                (playerMove.width == playerWait.width + 50 ||
                    playerMove.width == playerWait.width - 50))
        ) {
            console.log('FUCKING FIGHT');
            playerMove.fight = true;
            playerWait.fight = true;
            playerWait.play = false;
            playerMove.play = true;
        }
        if (playerMove.move.top == 0 && move == 0) {
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
        }
    }
}

function movePlayerPressDown(side, playerMove, playerWait) {
    // check if possibility to move TOP 
    if (playerMove.play && side && playerMove.move.down != 0) {
        playerMove.height == canvaHeight - 50 ?
            (playerMove.height = canvaHeight - 50) :
            (playerMove.height += 50);
        playerMove.move.down -= 50;

        move <= 0 ? (move = 0) : (move -= 1);

        Move.makeDataMovePlayer(playerMove, playerWait, celuleObstacle, move);
        if (
            (playerMove.height == playerWait.height - 50 &&
                playerMove.width == playerWait.width) ||
            (playerMove.height == playerWait.height &&
                (playerMove.width == playerWait.width + 50 ||
                    playerMove.width == playerWait.width - 50))
        ) {
            playerMove.fight = true;
            playerWait.fight = true;
            playerWait.play = false;
            playerMove.play = true;
        }
        if (playerMove.move.down == 0 && move == 0) {
            playerMove.play = false;
            playerWait.play = true;
            move = 3;

            Armes.donTakeArmes(playerMove);

            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
        }
    }
}

function movePlayerPressEnter(side, playerMove, playerWait) {
    // check if possibility to move TOP 
    if (playerMove.play && side) {
        playerMove.move.down = 0;
        playerMove.move.top = 0;
        playerMove.move.left = 0;
        playerMove.move.right = 0;

        if (playerMove.move.down == 0) {
            playerMove.play = false;
            playerWait.play = true;
            move = 3;
            Armes.specilaStopTurn(playerMove, fullArmes);
            Move.makeDataMovePlayer(playerWait, playerMove, celuleObstacle, move);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player1.fight == false && player2.fight == false) {

        // Draw the word phase Exploration 
        Draw.drawBack(ctx, back1, imgBack);
        Draw.drawGrid(ctx, celuleWidthHeight)

        Draw.drawObstacle(ctx, celuleObstacle, three, imgObastacle);
        Draw.drawArms(ctx, fullArmes);
        Draw.drawPlayer(ctx, player1, player11, imgPlayer1);
        Draw.drawPlayer(ctx, player2, player22, imgPlayer2);

        // Turn to player 1
        if (player1.play) {
            // draw movement 
            Draw.drawMovement(ctx, player1);
            Armes.take(player1, fullArmes);


            // move right
            movePlayerPressRight(rightPressed, player1, player2)
            rightPressed = false
            movePlayerPressLeft(leftPressed, player1, player2)
            leftPressed = false
            movePlayerPressTop(topPressed, player1, player2)
            topPressed = false
            movePlayerPressDown(downPressed, player1, player2)
            downPressed = false
            movePlayerPressEnter(enterPressed, player1, player2)
            enterPressed = false
        }
        if (player2.play) {

            Draw.drawMovement(ctx, player2);
            Armes.take(player2, fullArmes);


            movePlayerPressRight(rightPressed, player2, player1)
            rightPressed = false
            movePlayerPressLeft(leftPressed, player2, player1)
            leftPressed = false
            movePlayerPressTop(topPressed, player2, player1)
            topPressed = false
            movePlayerPressDown(downPressed, player2, player1)
            downPressed = false
            movePlayerPressEnter(enterPressed, player2, player1)
            enterPressed = false
        }
    } else if (player1.fight && player2.fight) {
        // draw the background phase combat
        Draw.drawBack(ctx, back2, imgBack);

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
                drawSelecteur(ctx, seleteur, player1SelecteurAttackX, player1SelecteurAttackY)

            } else if (player1.defense) {
                drawSelecteur(ctx, seleteur, player1SelecteurDefenseX, player1SelecteurDefenseY)
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
                drawSelecteur(ctx, seleteur, player2SelecteurAttackX, player2SelecteurAttackY)

            } else if (player2.defense) {
                drawSelecteur(ctx, seleteur, player2SelecteurDefenseX, player2SelecteurDefenseY)
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
        Draw.drawBack(ctx, back3, imgBack);

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