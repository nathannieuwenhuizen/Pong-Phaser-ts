import game = PIXI.game;

class Paddle extends Phaser.Graphics{
    public speed: number = 300;
    public min_speed: number = 300;
    public max_speed: number = 600;

    constructor(game: Fabrique.IGame, x:number, y:number){
        super(game,x,y);

        this.beginFill(0xFFFFFF);
        this.drawRect(0, 0, 32, 256);
        game.physics.arcade.enable(this);
        this.boundsPadding = 0;
        this.pivot.set(32/2,256/2);
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        this.scale.set(0.5,0.5);

    }

    public accelerate(){
        if (this.speed < this.max_speed)
        {
            this.speed += 20;
        }
    }
    public reset(){
        this.speed = this.min_speed;
        this.y = game.height / 2;
    }
}
