class MakeWorld {
    /* constructor() {
         this.canvas = document.getElementById('canvas');
         this.ctx = canvas.getContext('2d');
         this.canvaWidth = canvas.width;
         this.canvaHeight = canvas.height;
     }*/
    static makeGridData(size) {
        const celule = []
        const divisionWidth = size / 50;
        let save = size;
        for (let index = 0; index < divisionWidth + 1; index++) {
            celule.push(save);
            save = save - 50;
        }
        celule.reverse();
        celule.pop()
        return celule
    };
    static makeCeluleWidthHeightGrid(celuleHeight, celuleWidth, canvaWidth, canvaHeight) {
        const celuleWidthHeight = [];
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
        return celuleWidthHeight
    }

    static makeDataOfObstacle(nbr, celuleToCompare) {

        let ObstaclewidthHeight = [];
        let celule = []
        for (let index = 0; index < nbr; index++) {
            ObstaclewidthHeight = celuleToCompare[
                Math.floor(Math.random() * celuleToCompare.length)
            ]
            celule.forEach(checkSameOrNot => {
                while (checkSameOrNot == ObstaclewidthHeight) {
                    console.log('Check for find new Celule');

                    ObstaclewidthHeight = celuleToCompare[
                        Math.floor(Math.random() * celuleToCompare.length)
                    ]
                }

            });
            celule.push(ObstaclewidthHeight)
        }
        return celule
    };
    static makeCeluleSafeAfterObstacle(celuleWidthHeight, celuleToCompare) {
        const celuleSafeAfterObstacle = celuleWidthHeight;
        celuleToCompare.forEach((celule) => {
            for (let index = 0; index < celuleSafeAfterObstacle.length; index++) {
                if (
                    celule.width == celuleSafeAfterObstacle[index].width &&
                    celule.height == celuleSafeAfterObstacle[index].height
                ) {
                    celuleSafeAfterObstacle[index].value = 'obastacle'
                }
            }
        });
        return celuleSafeAfterObstacle
    };
    static makeDataArme(celuleWidthHeight, nbrArmes) {
        let widthHeight = [];
        let celuleArmes = []
        for (let index = 0; index < nbrArmes; index++) {
            widthHeight = celuleWidthHeight[
                Math.floor(Math.random() * celuleWidthHeight.length)
            ]
            while (widthHeight.value == 'obastacle') {
                console.log('Check for find new Celule for Player');

                widthHeight = celuleWidthHeight[
                    Math.floor(Math.random() * celuleWidthHeight.length)
                ]
            }

            celuleArmes.forEach(checkSameOrNot => {
                while (checkSameOrNot == widthHeight) {
                    console.log('Check for find new Celule');

                    widthHeight = celuleWidthHeight[
                        Math.floor(Math.random() * celuleWidthHeight.length)
                    ]
                }

            });
            celuleArmes.push(widthHeight)
        }
        return celuleArmes
    };
    static makeDataPlayer(celuleWidthHeight, nbrPlayer) {
        let widthHeight = [];
        let celulePlayer = []
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
}

export default MakeWorld