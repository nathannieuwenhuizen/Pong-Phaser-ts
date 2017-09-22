class Ball extends Phaser.Graphics{
    public ball_velocity: number = 500
    public ball_launched: boolean = false;
    constructor(x: number, y: number, game: Fabrique.IGame){
        super(game,x,y)
        this.beginFill(0x00FFFF);
        this.drawCircle(0,0,20);
        game.physics.arcade.enable(this);

        this.boundsPadding = 0;
        this.pivot.set(0,0);

        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
    }
    public launch(){
        if(!this.ball_launched)
        {
            this.ball_launched = true;
            this.body.velocity.x = -this.ball_velocity;
            //this.ball.body.velocity.y = -this.ball_velocity;

        }
    }
    public reset_ball(game: Fabrique.IGame) {
        this.ball_launched = false;
        this.body.velocity.setTo(0,0);
        this.x = game.world.centerX;
        this.y = game.world.centerY;

    }
}