class Move {


    static makeDataMoveleft(player, celuleObstacle) {
        let moveLeft = [];
        let width = player.width - 50;
        let height = player.height;
        let saveObstacle = [];
        let moveLeftAfterObstacle = 150
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

                moveLeftAfterObstacle = 0
            } else if (moveLeft[0].width != saveObstacle[0]) {
                if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0]) {

                    moveLeftAfterObstacle = 50
                } else if (moveLeft[1].width != saveObstacle[y]) {
                    if (moveLeft[2].width == saveObstacle[y]) {

                        moveLeftAfterObstacle = 100
                    } else if (
                        moveLeft[2].width != saveObstacle[y] &&
                        moveLeft[1].width != saveObstacle[y]
                    ) {

                        moveLeftAfterObstacle = 150
                    }
                }
            }
        }
        player.move.left = moveLeftAfterObstacle;
    };
    static makeDataMoveTop(player, celuleObstacle) {
        let moveLeft = [];
        let width = player.width;
        let height = player.height - 50;
        let saveObstacle = [];
        let moveTopAfterObstacle = 150
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
                moveTopAfterObstacle = 0
            } else if (moveLeft[0].height != saveObstacle[0]) {
                if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                    moveTopAfterObstacle = 50
                } else if (moveLeft[1].height != saveObstacle[y]) {
                    if (moveLeft[2].height == saveObstacle[y]) {
                        moveTopAfterObstacle = 100
                    } else if (
                        moveLeft[2].height != saveObstacle[y] &&
                        moveLeft[1].height != saveObstacle[y]
                    ) {
                        moveTopAfterObstacle = 150
                    }
                }
            }
        }
        player.move.top = moveTopAfterObstacle
    };
    static makeDataMoveBottom(player, celuleObstacle) {
        let moveLeft = [];
        let width = player.width;
        let height = player.height + 50;
        let saveObstacle = [];
        let moveBottomAfterObstacle = 150
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
                moveBottomAfterObstacle = 0
            } else if (moveLeft[0].height != saveObstacle[0]) {
                if (moveLeft[1].height == saveObstacle[1] || moveLeft[1].height == saveObstacle[0]) {
                    moveBottomAfterObstacle = 50
                } else if (moveLeft[1].height != saveObstacle[y]) {
                    if (moveLeft[2].height == saveObstacle[y]) {
                        moveBottomAfterObstacle = 100
                    } else if (
                        moveLeft[2].height != saveObstacle[y] &&
                        moveLeft[1].height != saveObstacle[y]
                    ) {
                        moveBottomAfterObstacle = 150
                    }
                }
            }
        }
        player.move.down = moveBottomAfterObstacle
    };
    static makeDataMoveRight(player, celuleObstacle) {
        let moveLeft = [];
        let width = player.width + 50;
        let height = player.height;
        let saveObstacle = [];
        let moveRightAfterObstacle = 150
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
                moveRightAfterObstacle = 0
            } else if (moveLeft[0].width != saveObstacle[0]) {
                if (moveLeft[1].width == saveObstacle[1] || moveLeft[1].width == saveObstacle[0]) {
                    moveRightAfterObstacle = 50
                } else if (moveLeft[1].width != saveObstacle[y]) {
                    if (moveLeft[2].width == saveObstacle[y]) {
                        moveRightAfterObstacle = 100
                    } else if (
                        moveLeft[2].width != saveObstacle[y] &&
                        moveLeft[1].width != saveObstacle[y]
                    ) {
                        moveRightAfterObstacle = 150
                    }
                }
            }
        }
        player.move.right = moveRightAfterObstacle
    };
    static makeDataMovePlayer(player, celuleObstacle) {
        this.makeDataMoveleft(player, celuleObstacle)
        this.makeDataMoveTop(player, celuleObstacle)
        this.makeDataMoveBottom(player, celuleObstacle)
        this.makeDataMoveRight(player, celuleObstacle)
    }
}

export default Move