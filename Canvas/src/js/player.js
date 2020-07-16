class Player {
    constructor(width, height, top, down, left, right, color, play, arme) {
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
        this.arme = arme
        this.gun = 0
        this.fight = false;
        this.healh = 100;
        this.attack = true;
        this.defense = false
        this.armor = 0

    }
}

export default Player