class Player {
    constructor(width, height, up, down, left, right, color, play) {
        this.width = width;
        this.height = height;
        this.move = {
            up: up,
            down: down,
            left: left,
            right: right,
            color: color
        };
        this.play = play
    }
}

export default Player