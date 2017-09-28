class AfterImage {
    public after_images: any;
    public bounce_images: any;
    public index: number = 1;
    public index2: number = 1;

    constructor(amount: number, game: Fabrique.IGame) {

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

    public lower_alpha_after_images(): void {
        for (let i: number = 0; i < this.after_images.length; i++) {
            this.after_images[i].alpha -= 0.01;
            this.after_images[i].width -= 0.2;
            this.after_images[i].height -= 0.2;
        }
        for (let i: number = 0; i < this.bounce_images.length; i++) {
            this.bounce_images[i].alpha -= 0.02;
            this.bounce_images[i].width += 2;
            this.bounce_images[i].height += 2;
        }
    }

    public help(x: number, y: number): void {
        this.after_images[this.index].x = x;
        this.after_images[this.index].y = y;
        this.after_images[this.index].alpha = .5;
        this.after_images[this.index].height = this.after_images[this.index].width = 20;
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
        if (this.index2 >= this.bounce_images.length - 1) {
            this.index2 = 1;
        } else {
            this.index2++;
        }
    }
}
