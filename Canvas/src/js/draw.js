class Draw {

    static drawGrid(ctx, celule) {
        celule.forEach((gridDraw) => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(250, 250, 250, 0.1)';
            ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
            ctx.closePath();
        });
    }
    static drawBack(ctx, imgObject) {
        ctx.drawImage(imgObject, 0, 0, 1000, 500);

    }
    static drawObstacle(ctx, celules, imgObject) {
        celules.forEach((celule) => {
            if (celule.value == 'obastacle') {

                ctx.drawImage(imgObject, celule.width, celule.height);
            }
        });
    }
    static drawArms(ctx, celules) {
        celules.forEach((arme) => {
            ctx.beginPath();
            ctx.drawImage(
                arme.name.boxImage,
                arme.name.width,
                arme.name.height,
                40,
                40
            );

        });
    }
    static drawPlayer(ctx, player, imgObject) {
        ctx.drawImage(imgObject, player.width, player.height, 50, 50);
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
    /*---------PHASE COMBAT ---------------*/

    static drawSelecteur(ctx, el, x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '25px serif';
        ctx.fillText(el, x, y);
        ctx.closePath();
    };
    static drawSelecteur(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '25px serif';
        ctx.fillText(`>`, x, y);
        ctx.closePath();
    };
    static drawFontDefesense(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '25px serif';
        ctx.fillText(`Defense`, x, y);
        ctx.closePath();
    }
    static drawFontAttack(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '25px serif';
        ctx.fillText(`Attack`, x, y);
        ctx.closePath();
    }
    static drawplayerFight(ctx, img, x, y) {
        ctx.drawImage(img, x, y);

    };
    static drawplayerHeart(ctx, img, x) {
        ctx.drawImage(img, x, 5, 50, 50);

    };
    static drawplayerHealh(ctx, player, x) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '20px serif';
        ctx.fillText(`100 / ${player.healh}`, x, 35);
        ctx.closePath();

    }
}

export default Draw