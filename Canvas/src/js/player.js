class Player {
    constructor(width, height, top, down, left, right, color, play) {
        this.width = width;
        this.height = height;
        this.move = {
            top: top,
            down: down,
            left: left,
            right: right,
            color: color
        };
        this.play = play
    }
}

export default Player