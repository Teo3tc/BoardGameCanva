import three from '../assets/img/New_Piskel.png';
var img = new Image(); // Crée un nouvel élément img


class Draw {


    static drawGrid(ctx, celule) {
        celule.forEach((gridDraw) => {
            ctx.beginPath();
            ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
            ctx.closePath();
        });
    }
    static drawObstacle(ctx, celules) {
        celules.forEach((celule) => {
            var img = new Image(); // Crée un nouvel élément img

            //  exécute les instructions drawImage ici 
            ctx.drawImage(img, celule.width, celule.height);

            img.src = three


            /*ctx.beginPath();
            ctx.rect(celule.width, celule.height, 50, 50);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.closePath();*/
        });
    }
    static drawArms(ctx, armes) {
        armes.forEach((arme) => {
            ctx.beginPath();
            ctx.rect(arme.name.width, arme.name.height, 50, 50);
            ctx.fillStyle = arme.name.color;
            ctx.fill();
            ctx.closePath();
        });
    }
    static drawPlayer(ctx, player) {
        ctx.beginPath();
        ctx.rect(player.width, player.height, 50, 50);
        ctx.fillStyle = '#F9C5C6';
        ctx.fill();
        ctx.closePath();
    }
    static drawMoveLeft(ctx, player) {
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
    static drawMoveTop(ctx, player) {
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
    static drawMoveBottom(ctx, player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width, player.height + 50, 50, player.move.down);
        ctx.closePath();
    };
    static drawMoveRight(ctx, player) {
        ctx.beginPath();
        ctx.fillStyle = player.move.color;
        ctx.fillRect(player.width + 50, player.height, player.move.right, 50);
        ctx.closePath();
    };
    static drawMovement(ctx, player) {
        this.drawMoveLeft(ctx, player);
        this.drawMoveTop(ctx, player);
        this.drawMoveBottom(ctx, player);
        this.drawMoveRight(ctx, player);
    }
}

export default Draw