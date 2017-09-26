class Ball extends Phaser.Graphics{
    public ball_velocity: number = 500
    public ball_launched: boolean = false;
    public min_velocity: number = 500;
    public max_velocity: number = 800;

    private after_images: Array;
    public list_pf_positions: Array;
    private last_position;

    constructor(x: number, y: number, game: Fabrique.IGame){
        super(game,x,y)
        this.beginFill(0xFFFFFF);
        this.drawCircle(0,0,20);
        game.physics.arcade.enable(this);

        this.boundsPadding = 0;
        this.pivot.set(0,0);

        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        this.scale.set(1,1);
        this.body.velocity.x = 0;
        this.list_pf_positions = [
            {x: 20, y: 0},
            {x: 40, y: 0},
            {x: 60, y: 0}
        ];

        /*this.last_position = {x:this.x, y:this.y};
        this.after_images = new Array(3);
        for(let i: number = 0; i < 3; i++)
        {
            this.after_images[i] = game.add.graphics(this.list_pf_positions[i].x,this.list_pf_positions[i].y);
            this.after_images[i].beginFill(0xFFFFFF);
            this.after_images[i].fillAlpha = 0.5;
            this.after_images[i].drawCircle(0,0,20);
            //this.after_images.push(graph);
            this.addChild(this.after_images[i]);
        }*/

    }
    public launch(){
        if(!this.ball_launched)
        {
            this.ball_launched = true;
            this.body.velocity.x = -this.ball_velocity;
            //this.ball.body.velocity.y = -this.ball_velocity;

        }
    }
    public calculate_after_image():void{


        this.list_pf_positions.push({
            x: -this.body.velocity.x/20,
            y: -this.body.velocity.y/20

        });
        this.last_position = {x:this.x, y:this.y};
        this.list_pf_positions.splice(0,1);
        for(let i: number = 0; i < this.after_images.length; i++)
        {
            this.after_images[i].x = this.list_pf_positions[i].x;
            this.after_images[i].y = this.list_pf_positions[i].y;
        }
    }
    public reset_ball(game: Fabrique.IGame) {
        this.ball_launched = false;
        this.body.velocity.setTo(0,0);
        this.x = game.world.centerX;
        this.y = game.world.centerY;
        this.ball_velocity = this.min_velocity;
    }
    public accelerate(){
        if(this.ball_velocity < this.max_velocity)
            this.ball_velocity += 20;
    }


}