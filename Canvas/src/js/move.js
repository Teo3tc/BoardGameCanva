class Move {


    static makeDataMoveleft(player, playerWait, celuleObstacle, move) {
        let moveLeft = [];
        let width = player.width - 50;
        let height = player.height;
        let saveObstacle = [];
        let moveLeftAfterObstacle = 150
        move == 2 ? moveLeftAfterObstacle = 100 : moveLeftAfterObstacle
        move == 1 ? moveLeftAfterObstacle = 50 : moveLeftAfterObstacle
        move == 0 ? moveLeftAfterObstacle = 0 : moveLeftAfterObstacle
        for (let index = 0; index < move; index++) {
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
            if (moveLeft[0].width == saveObstacle[0] || moveLeft[0].width == playerWait.width + 50) {

                moveLeftAfterObstacle = 0
            } else if (moveLeft[0].width != saveObstacle[0] || moveLeft[0].width != playerWait.width + 50) {
                if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0] || moveLeft[1].width == playerWait.width + 50) {

                    moveLeftAfterObstacle = 50
                } else if (moveLeft[1].width != saveObstacle[y]) {
                    if (moveLeft[2].width == saveObstacle[y] || moveLeft[2].width == playerWait.width + 50) {

                        moveLeftAfterObstacle = 100
                    } else if (
                        moveLeft[2].width != saveObstacle[y] &&
                        moveLeft[1].width != saveObstacle[y] || moveLeft[2].width != playerWait.width + 50 && moveLeft[1].width != playerWait.width + 50
                    ) {

                        moveLeftAfterObstacle = 150
                    }
                }
            }
        }
        player.move.left = moveLeftAfterObstacle;
    };
    static makeDataMoveTop(player, playerWait, celuleObstacle, move) {
        let moveLeft = [];
        let width = player.width;
        let height = player.height - 50;
        let saveObstacle = [];
        let moveTopAfterObstacle = 150

        move == 2 ? moveTopAfterObstacle = 100 : moveTopAfterObstacle
        move == 1 ? moveTopAfterObstacle = 50 : moveTopAfterObstacle
        move == 0 ? moveTopAfterObstacle = 0 : moveTopAfterObstacle
        console.log(moveTopAfterObstacle);

        for (let index = 0; index < move; index++) {
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
        console.log(moveLeft);

        for (let y = 0; y < saveObstacle.length; y++) {
            if (moveLeft[0].height == saveObstacle[0] || moveLeft[0].height == playerWait.height + 50) {
                moveTopAfterObstacle = 0
            } else if (moveLeft[0].height != saveObstacle[0] || moveLeft[0].height != playerWait.height + 50) {
                if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0] || moveLeft[1].height == playerWait.height + 50) {
                    moveTopAfterObstacle = 50
                } else if (moveLeft[1].height != saveObstacle[y]) {
                    if (moveLeft[2].height == saveObstacle[y] || moveLeft[2].height == playerWait.height + 50) {
                        moveTopAfterObstacle = 100
                    } else if (
                        moveLeft[2].height != saveObstacle[y] &&
                        moveLeft[1].height != saveObstacle[y] || moveLeft[2].height != playerWait.height + 50 && moveLeft[1].height != playerWait.height + 50
                    ) {
                        moveTopAfterObstacle = 150
                    }
                }
            }
        }
        player.move.top = moveTopAfterObstacle
    };
    static makeDataMoveBottom(player, playerWait, celuleObstacle, move) {
        let moveLeft = [];
        let width = player.width;
        let height = player.height + 50;
        let saveObstacle = [];
        let moveBottomAfterObstacle = 150
        move == 2 ? moveBottomAfterObstacle = 100 : moveBottomAfterObstacle
        move == 1 ? moveBottomAfterObstacle = 50 : moveBottomAfterObstacle
        move == 0 ? moveBottomAfterObstacle = 0 : moveBottomAfterObstacle
        for (let index = 0; index < move; index++) {
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
            if (moveLeft[0].height == saveObstacle[0] || moveLeft[0].height == playerWait.height + 50) {
                moveBottomAfterObstacle = 0
            } else if (moveLeft[0].height != saveObstacle[0] || moveLeft[0].height != playerWait.height + 50) {
                if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0] || moveLeft[1].height == playerWait.height + 50) {
                    moveBottomAfterObstacle = 50
                } else if (moveLeft[1].height != saveObstacle[y]) {
                    if (moveLeft[2].height == saveObstacle[y] || moveLeft[2].height == playerWait.height + 50) {
                        moveBottomAfterObstacle = 100
                    } else if (
                        moveLeft[2].height != saveObstacle[y] &&
                        moveLeft[1].height != saveObstacle[y] || moveLeft[2].height != playerWait.height + 50 && moveLeft[1].height != playerWait.height + 50
                    ) {
                        moveBottomAfterObstacle = 150
                    }
                }
            }
        }
        player.move.down = moveBottomAfterObstacle
    };
    static makeDataMoveRight(player, playerWait, celuleObstacle, move) {
        let moveLeft = [];
        let width = player.width + 50;
        let height = player.height;
        let saveObstacle = [];
        let moveRightAfterObstacle = 150

        move == 2 ? moveRightAfterObstacle = 100 : moveRightAfterObstacle
        move == 1 ? moveRightAfterObstacle = 50 : moveRightAfterObstacle
        move == 0 ? moveRightAfterObstacle = 0 : moveRightAfterObstacle
        console.log(moveRightAfterObstacle);
        for (let index = 0; index < move; index++) {
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
            if (moveLeft[0].width == saveObstacle[0] || moveLeft[0].width == playerWait.width) {
                moveRightAfterObstacle = 0
            } else if (moveLeft[0].width != saveObstacle[0] || moveLeft[0].width != playerWait.width) {
                if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0] || moveLeft[1].width == playerWait.width) {
                    moveRightAfterObstacle = 50
                } else if (moveLeft[1].width != saveObstacle[y]) {
                    if (moveLeft[2].width == saveObstacle[y] || moveLeft[2].width == playerWait.width) {
                        moveRightAfterObstacle = 100
                    } else if (
                        moveLeft[2].width != saveObstacle[y] &&
                        moveLeft[1].width != saveObstacle[y] || moveLeft[2].width != playerWait.width && moveLeft[1].width != playerWait.width
                    ) {
                        moveRightAfterObstacle = 150
                    }
                }
            }
        }
        player.move.right = moveRightAfterObstacle
    };
    static makeDataMovePlayer(player, playerWait, celuleObstacle, move) {
        this.makeDataMoveleft(player, playerWait, celuleObstacle, move)
        this.makeDataMoveTop(player, playerWait, celuleObstacle, move)
        this.makeDataMoveBottom(player, playerWait, celuleObstacle, move)
        this.makeDataMoveRight(player, playerWait, celuleObstacle, move)
    }
}

export default Move