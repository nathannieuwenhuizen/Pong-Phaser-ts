import Key = Phaser.Key;

class PlayerPaddle extends Paddle{
    private top_cordinate_y: number;
    private bottom_cordinate_y: number;
    private up_input: Key;
    private down_input: Key;
    constructor(game:Fabrique.IGame,x:number,y:number, _up_input:number, _down_input: number ){
        super(game, x, y);
        this.top_cordinate_y = this.height/2;
        this.bottom_cordinate_y = this.game.world.height - this.top_cordinate_y;

        this.up_input = this.game.input.keyboard.addKey( _up_input);
        this.down_input = this.game.input.keyboard.addKey(_down_input);
    }
    public update_position(): void{
        //this.y = Math.min(Math.max(y, this.top_cordinate_y), this.bottom_cordinate_y);
        if(this.up_input.isDown) {
            this.body.velocity.y = -this.speed;
            if(this.down_input.isDown) {
                this.body.velocity.y = 0;
            }
        } else if(this.down_input.isDown) {
            this.body.velocity.y = this.speed;
        } else{
            this.body.velocity.y = 0;
        }
    }
}

class ComputerPaddle extends Paddle{
    private ai_goes_up:boolean = false;
    private ai_overshoot:number = 0;
    private ball: Ball;
    constructor(game: Fabrique.IGame, x: number, y: number, ball:Ball){
        super(game, x, y);
        this.ball = ball;

    }
    public update_position():void{
        if (this.ball.y > this.y + this.height/3){
            //this.y += this.speed;
            //this.body.velocity.y =  this.speed*100;
            this.body.velocity.y = Math.abs( this.ball.body.velocity.y * (1 + this.ai_overshoot));
            if(this.body.velocity.y > this.speed){
                this.body.velocity.y = this.speed;
            }

            // if (!this.ai_goes_up){
            //     this.ai_overshoot = -.25 + Math.random() * 0.5;
            //     this.ai_goes_up = true;
            // }
        } else if (this.ball.y < this.y - this.height / 3) {
            //this.y -= this.speed;
            //this.body.velocity.y =  -this.speed*100;
            this.body.velocity.y =  - Math.abs(this.ball.body.velocity.y * (1 + this.ai_overshoot));
            if (this.body.velocity.y < -this.speed){
                this.body.velocity.y = -this.speed;
            }


            // if(this.ai_goes_up){
            //     this.ai_overshoot = -.25 + Math.random() * 0.5;
            //     this.ai_goes_up = false;
            // }
        }
        else {
            this.body.velocity.y = 0;
        }
    }
}