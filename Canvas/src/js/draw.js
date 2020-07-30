class Draw {

    static drawGrid(ctx, celule) {
        celule.forEach((gridDraw) => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(250, 250, 250, 0.1)';
            ctx.strokeRect(gridDraw.width, gridDraw.height, 50, 50);
            ctx.closePath();
        });
    }
    static drawBack(ctx, img, imgObject) {
        ctx.drawImage(imgObject, 0, 0, 1000, 500);

        imgObject.src = img;
    }
    static drawObstacle(ctx, celules, img, imgObject) {
        celules.forEach((celule) => {
            ctx.drawImage(imgObject, celule.width, celule.height);

            imgObject.src = img;
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

            arme.name.boxImage.src = arme.name.image;
        });
    }
    static drawPlayer(ctx, player, img, imgObject) {
        ctx.drawImage(imgObject, player.width, player.height, 50, 50);
        imgObject.src = img;

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