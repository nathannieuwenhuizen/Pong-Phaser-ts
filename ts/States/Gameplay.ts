import Label = BoilerPlate.Label;

module BoilerPlate {
    import game = PIXI.game;

    export class Gameplay extends Phaser.State implements Fabrique.IState  {
        public static Name: string = 'gameplay';
        public static pause: boolean = false;
        public name: string = Gameplay.Name;
        public game: Fabrique.IGame;
        public menu: Main_Menu;
        public in_pause:boolean;
        public in_game: boolean;
        private score1: number = 0;
        private score2: number = 0;
        private score_text: Phaser.Text;
        private click_to_start_text: Phaser.Text;
        private  timer: number = 0;
        public ball: Ball;
        private paddle1:PlayerPaddle;
        public paddle2:ComputerPaddle;
        public loop: any;
        private filter: Void_Filter;
        private sprite: Phaser.Sprite;
        private pauseMenu: PauseMenu;
        public pauseBtn: Phaser.Button;
        public bg: Phaser.Graphics;
        private bg_color: any;
        constructor() {
            super();
        }
        public init(): void {
            this.game.world.removeAll();
            SoundManager.getInstance(this.game);
        }
        public create(): void {
            super.create();

            //Send a screen view to Google to track different states
            // this.game.analytics.google.sendScreenView(this.name);
            //this.background = this.game.add.image(0, 0, Atlases.Interface, 'bg_gameplay');

            this.bg = this.game.add.graphics( 0, 0 );
            this.bg.beginFill(0xFFFFFF, 1);
            this.bg.boundsPadding = 0;
            this.bg.drawRect(0, 0, this.game.width, this.game.height);
            this.bg.tint = 0x000000;

            this.in_game = true;
            this.paddle1 = new PlayerPaddle(this.game, 50, this.game.world.height / 2);
            this.game.add.existing(this.paddle1);
            this.paddle2 = new ComputerPaddle(this.game, this.game.world.width - 50, this.game.world.height / 2);
            this.game.add.existing(this.paddle2);
            this.ball = new Ball( this.game.world.centerX, this.game.world.centerY, this.game)
            this.game.add.existing(this.ball);
            this.game.input.onDown.add(this.launch_ball,this);

            this.score1 = this.score2 = this.timer = 0;
            this.score_text = new Label(this.game, this.game.world.width/2,60, '0   -   0',{
                    font: '64px Pong',
                    fill:'#fff',
                    align: 'center'}
                , 400, 100);
            this.score_text.anchor.set(0.5);
            this.click_to_start_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-60,'',{
                font: '15px Pong',
                    fill:'#fff',
                    align: 'center'
            });
            this.click_to_start_text.anchor.set(0.5);
            this.pauseMenu = new PauseMenu(this.game.width/2, this.game.height/2, this.game, "pause", "Resume", "Back to menu",this, true);
            this.pauseBtn = this.game.add.button(80, 50, 'pause', this.pauseMenu.ToggleShow , this.pauseMenu, 2, 1, 0);


            this.in_game = false;
            this.menu = new Main_Menu(this.game.width/2, this.game.height/2, this.game, this);


            this.filter = new Void_Filter(this.game);
            this.sprite = this.game.add.sprite( 0,0);
            this.sprite.width = this.game.width;
            this.sprite.height = this.game.height;
            this.sprite.alpha = 0.1;
            this.sprite.filters = [ this.filter.filter_effect ];

        }


        public back_to_menu():void{
            //SoundManager.getInstance().play(Sounds.Biep);
            this.in_game = false;
            this.menu.back_to_menu();
            this.ball.reset_ball(this.game);
            this.in_pause = true;
        }
        public launch_ball(): void{
            if(this.in_game)
            {
                this.ball.launch();
            }
        }

        /**
         * Called every time the rotation or game size has changed.
         * Rescales and repositions the objects.
         */

        public update(): void {

            if(!this.in_pause)
            {
                this.paddle1.update_position(this.game.input.y);
                this.paddle2.follow(this.ball);
                this.collission_detection();
            }
            this.filter.filter_effect.update(0);

        }

        //collision of the ball with the paddles and ball with the two edges are handled here.
        public collission_detection(): void{
            this.game.physics.arcade.collide(this.paddle1,this.ball,
                (function(scope){
                    return function(){
                        SoundManager.getInstance().play(Sounds.Biep2);
                        scope.redirect_ball(scope.paddle1,scope.ball);
                    };
                })(this));
            this.game.physics.arcade.collide(this.paddle2,this.ball,
                (function(scope){
                    return function(){
                        SoundManager.getInstance().play(Sounds.Biep);
                        scope.redirect_ball(scope.paddle2,scope.ball);
                    };
                })(this));
            if(this.ball.body.blocked.left){

                this.someone_scored(false);
            }
            else if (this.ball.body.blocked.right){

                this.someone_scored(true);
            }
        }
        public someone_scored(you_scored:boolean):void{

            this.ball.reset_ball(this.game);
            this.paddle2.y = this.game.world.height/2;
            if(you_scored){
                this.score1++;
                this.score_text.text = this.score1 +'   -   '+ this.score2;
                if(this.score1 == 5)
                {
                    this.game_ends("You've won");
                }
                else{
                    console.log("flicker!");
                    this.UI_Flicker();
                }
            }
            else{
                this.score2++;
                this.score_text.text = this.score1 +'   -   '+ this.score2;
                if(this.score2 == 5)
                {
                    this.game_ends("You've lost");
                }
                else {
                    this.UI_Flicker();
                }
            }
        }
        public game_ends(result: string):void{
            this.in_game = false;
            clearInterval(this.loop);
            this.click_to_start_text.text = '';
            this.pauseBtn.visible = false;
            this.pauseMenu = new PauseMenu(this.game.width/2, this.game.height/2, this.game,  result, "Retry", "Back to menu",this, false);
            this.pauseMenu.ToggleShow();

        }
        public restart():void{

            var scope = this;
            scope.score1 = scope.score2 = 0;
            this.score_text.text = this.score1 +'   -   '+ this.score2;
            scope.pauseBtn.visible = true;
            scope.UI_Flicker();
            scope.in_game = true;
            console.log(this.ball);
            //this.ball.reset_ball();

            this.ball.x = this.game.world.centerX;
            this.ball.y = this.game.world.centerY;
            this.pauseMenu = new PauseMenu(this.game.width/2, this.game.height/2, this.game, "pause", "Resume", "Back to menu",this, true);

        }

        private componentToHex(c): void {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        private rgbToHex(r, g, b):void {
            return "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        }


        //gives the ball an angle of direction based on where the ball is hitted
        public redirect_ball(paddle:Paddle,ball:Ball): void{
            this.bg.tint = this.rgbToHex(Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100));
            var dx = -paddle.x + ball.x;
            var dy = (-paddle.y + ball.y)/2;
            var root = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
            dx /= root;
            dy /= root;

            ball.body.velocity.setTo(
                dx*ball.ball_velocity,
                dy*ball.ball_velocity
            )
        }

        public Switch(): void{
            if(this.click_to_start_text.text == '')
            {
                this.click_to_start_text.text = 'Left click to start!';
            }
            else if(this.ball.ball_launched)
            {
                console.log("loop");
                this.click_to_start_text.text = '';
                clearInterval(this.loop);
            }
        }
        public UI_Flicker():void{
            this.loop = setInterval((function (scope){
                return function(){
                    scope.Switch();

                }
            })(this),100);
        }
    }
}
