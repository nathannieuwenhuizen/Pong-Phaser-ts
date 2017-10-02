class AfterImage {
    public after_images: any;
    public bounce_images: any;
    public index: number = 1;
    public index2: number = 1;
    public game: Fabrique.IGame;

    constructor(amount: number, game: Fabrique.IGame) {
        this.game = game;
        this.after_images = new Array(Phaser.Graphics);
        this.bounce_images = new Array(Phaser.Graphics);
        console.log(typeof this.after_images);
        for (let i: number = 0; i < amount; i++) {
            let temp: Phaser.Graphics = game.add.graphics(0, 0);

            temp.beginFill(0xFFFFFF);
            temp.drawCircle(0, 0, 20);
            //game.add.existing(temp);
            this.after_images.push(temp);
        }
        for (let i: number = 0; i < 3; i++) {
            let temp: Phaser.Graphics = game.add.graphics(0, 0);

            temp.beginFill(0xFFFFFF);
            temp.drawCircle(0, 0, 20);
            //game.add.existing(temp);
            this.bounce_images.push(temp);
        }
    }

    public help(x: number, y: number): void {
        this.after_images[this.index].x = x;
        this.after_images[this.index].y = y;
        this.after_images[this.index].alpha = .5;
        this.after_images[this.index].height = this.after_images[this.index].width = 20;

        this.game.add.tween(this.after_images[this.index]).to({alpha: 0, width: 5, height: 5}, 1000, 'Linear', true);

        if (this.index >= this.after_images.length - 1) {
            this.index = 1;
        } else {
            this.index++;
        }
    }

    public help2(x: number, y: number, width: number = 30, alpha: number = 0.7, tint: any = 0xFFFFFF): void {
        this.bounce_images[this.index2].x = x;
        this.bounce_images[this.index2].y = y;
        this.bounce_images[this.index2].alpha = alpha;
        this.bounce_images[this.index2].tint = tint;
        this.bounce_images[this.index2].height = this.bounce_images[this.index2].width = width;

        this.game.add.tween(this.bounce_images[this.index2]).to({
            alpha: 0,
            width: 100,
            height: 100
        }, 800, 'Linear', true);

        if (this.index2 >= this.bounce_images.length - 1) {
            this.index2 = 1;
        } else {
            this.index2++;
        }
    }
}
