class Paddle extends Phaser.Graphics{
    constructor(game: Fabrique.IGame, x:number, y:number){
        super(game,x,y);

        this.beginFill(0xFFFFFF);
        this.drawRect(0, 0, 32, 256);
        game.physics.arcade.enable(this);
        this.boundsPadding = 0;
        this.pivot.set(0,256/2);
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        this.scale.set(0.5,0.5);

    }
}
