class PlayerPaddle extends Paddle{
    private top_cordinate_y: number;
    private bottom_cordinate_y: number;
    constructor(game:Fabrique.IGame,x:number,y:number){
        super(game, x, y);
        this.top_cordinate_y = this.height/2;
        this.bottom_cordinate_y = this.game.world.height - this.top_cordinate_y;
    }
    public update_position(y: number): void{
        this.y = Math.min(Math.max(y, this.top_cordinate_y), this.bottom_cordinate_y);
    }
}

class ComputerPaddle extends Paddle{
    private ai_goes_up:boolean = false;
    private ai_overshoot:number = 0.5;
    constructor(game:Fabrique.IGame, x: number, y: number){
        super(game, x, y);
    }
    public follow(ball: Ball):void{
        if (ball.y > this.y + this.height/3){
            this.body.velocity.y = Math.abs( ball.body.velocity.y * (1 + this.ai_overshoot));
            if(!this.ai_goes_up){
                this.ai_overshoot = -.25 + Math.random() * 0.5;
                this.ai_goes_up = true;
            }
        } else if (ball.y < this.y - this.height / 3) {
            this.body.velocity.y =  - Math.abs(ball.body.velocity.y * (1 + this.ai_overshoot));
            if(this.ai_goes_up){
                this.ai_overshoot = -.25 + Math.random() * 0.5;
                this.ai_goes_up = false;
            }
        }
        else {
            this.body.velocity.y = 0;
        }
    }
}