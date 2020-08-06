class Armes {
    constructor(name, width, height, color, power, image) {
        this.name = name
        this.width = width
        this.height = height
        this.color = color
        this.power = power
        this.boxImage = image
    }
    static take(player, armes) {


        armes.forEach((arms, index) => {

            if (player.width == arms.name.width && player.height == arms.name.height) {
                if (player.gun == 0 && player.arme == undefined) {
                    player.arme = arms;
                    armes.splice(index, 1);
                    player.gun = 1;
                    console.log(player.gun);
                } else if (player.gun == 1) {

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
    static donTakeArmes(player) {
        if (player.gun != 0) {
            player.gun == 2 ? (player.gun = 1) : (player.gun = 1);
        }
    }
    static specilaStopTurn(player, armes) {
        armes.forEach((arme) => {
            if (player.width != arme.name.width && player.height != arme.name.height) {
                if (player.gun != 0) {
                    player.gun == 2 ? (player.gun = 1) : (player.gun = 1);
                }
            }
        });
    }
}

export default Armes