module BoilerPlate {

    export class Gameplay extends Phaser.State implements Fabrique.IState {
        public static Name: string = 'gameplay';
        public static pause: boolean = false;
        public name: string = Gameplay.Name;
        public game: Fabrique.IGame;

        public menu: MainMenu;

        public in_pause: boolean;
        public in_game: boolean;
        public end_score: number = 5;
        public ball: Ball;
        public after_images: AfterImage;
        public paddle2: any;
        public game_layer: any;
        private score1: number = 0;
        private score2: number = 0;
        private score_text: Phaser.Text;
        private click_to_start_text: Phaser.Text;
        private paddle1: PlayerPaddle;
        private bg: Phaser.Graphics;
        private filter: VoidFilter;
        private sprite: Phaser.Sprite;
        private pauseMenu: PauseMenu;
        private pauseBtn: Phaser.Button;
        private resultMenu: PauseMenu;
        private controls_sprite1: Phaser.Sprite;
        private controls_sprite2: Phaser.Sprite;

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

            //background
            this.bg = this.game.add.graphics(0, 0);
            this.bg.beginFill(0xFFFFFF, 1);
            this.bg.boundsPadding = 0;
            this.bg.drawRect(0, 0, this.game.width, this.game.height);
            this.bg.tint = 0x000000;

            //make paddles, ball and effects.
            this.ball = new Ball(this.game.world.centerX, this.game.world.centerY, this.game);
            this.paddle1 = new PlayerPaddle(this.game, 50, this.game.world.height / 2, Phaser.Keyboard.W, Phaser.Keyboard.S);
            this.paddle2 = new ComputerPaddle(this.game, this.game.world.width - 50, this.game.world.height / 2, this.ball);
            this.after_images = new AfterImage(30, this.game);

            //draw play field
            let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
            graphics.lineStyle(4, 0xffffff, 0.5);
            graphics.moveTo(this.game.width / 2, 0);
            graphics.lineTo(this.game.width / 2, this.game.height);
            graphics.lineStyle(20, 0xffffff, 1);
            graphics.moveTo(0, 0);
            graphics.lineTo(this.game.width, 0);
            graphics.lineTo(this.game.width, this.game.height);
            graphics.lineTo(0, this.game.height);
            graphics.lineTo(0, 0);
            graphics.endFill();

            this.game_layer = this.add.group();

            this.game_layer.add(this.paddle2);
            this.game_layer.add(this.paddle1);
            this.game_layer.addChild(this.ball);
            //this.game_layer.addChild(this.after_images);

            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.launch_ball, this);

            this.controls_sprite1 = this.game.add.sprite(100, this.game.height / 2, Images.Controls_1);
            this.controls_sprite1.anchor.set(.5);
            this.controls_sprite1.scale.set(.2);

            this.controls_sprite2 = this.game.add.sprite(this.game.width - 100, this.game.height / 2, Images.Controls_2);
            this.controls_sprite2.anchor.set(.5);
            this.controls_sprite2.scale.set(.2);
            this.controls_sprite1.alpha = this.controls_sprite2.alpha = 0;

            this.score1 = this.score2 = 0;
            this.score_text = new Label(this.game, this.game.world.width / 2, 60, '0   0', {
                    font: '64px Pong',
                    fill: '#fff',
                    align: 'center'
                }
                , 400, 100);
            this.score_text.anchor.set(0.5);

            this.click_to_start_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 60, '', {
                font: '15px Pong',
                fill: '#fff',
                align: 'center'
            });
            this.click_to_start_text.anchor.set(0.5);

            this.resultMenu = new PauseMenu(this.game.width / 2, this.game.height / 2, this.game, '', 'Retry', 'Back to menu', this, false);
            this.pauseMenu = new PauseMenu(this.game.width / 2, this.game.height / 2, this.game, 'pause', 'Resume', 'Back to menu', this, true);
            this.pauseBtn = this.game.add.button(80, 50, Images.Pause, this.pause_button_clicked.bind(this), this.pauseMenu, 2, 1, 0);

            this.in_game = false;
            this.menu = new MainMenu(this.game.width / 2, this.game.height / 2, this.game, this);

            this.filter = new VoidFilter(this.game);
            this.sprite = this.game.add.sprite(0, 0);
            this.sprite.width = this.game.width;
            this.sprite.height = this.game.height;
            this.sprite.alpha = 0.1;
            this.sprite.filters = [this.filter.filter_effect];

            SoundManager.getInstance().play(Sounds.menu_music, Sounds.volume * 0.5, true);

            //this.game.camera.fade(0x000000, 4000);
            this.render_after_images();
        }

        public pause_button_clicked(): void {
            SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);
            this.pauseMenu.ToggleShow();
        }

        public back_to_menu(): void {
            SoundManager.getInstance().play(Sounds.menu_music, Sounds.volume * 0.5, true);
            SoundManager.getInstance().stop(Sounds.in_game_music);

            this.in_game = false;
            this.menu.back_to_menu();
            this.ball.reset_ball(this.game);
            this.in_pause = true;

            this.paddle2.y = this.paddle1.y = this.game.world.height / 2;

        }

        public launch_ball(): void {

            if (this.in_game) {
                SoundManager.getInstance().play(Sounds.launch, Sounds.volume);
                this.ball.launch();
                this.click_to_start_text.text = '';
                this.removeControlSprite(this.controls_sprite1);
                this.removeControlSprite(this.controls_sprite2);
            }
        }

        public removeControlSprite(sprite: Phaser.Sprite): void {
            this.game.tweens.removeFrom(sprite);
            this.game.add.tween(sprite).to({alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0);
        }

        public render_after_images(): void {
            setInterval((x: number) => {
                if (!this.in_pause && this.ball.ball_launched) {
                    this.after_images.help(this.ball.x, this.ball.y);
                }
            }, 50);

        }

        public update(): void {

            if (!this.in_pause) {
                this.paddle1.update_position();
                this.paddle2.update_position();
                this.collission_detection();
                this.after_images.lower_alpha_after_images();
            }
            this.filter.filter_effect.update(0);

        }

        //collision of the ball with the paddles and ball with the two edges are handled here.
        public collission_detection(): void {

            this.game.physics.arcade.collide(this.paddle1, this.ball,
                () => this.redirect_ball(this.paddle1, this.ball)
            );
            this.game.physics.arcade.collide(this.paddle2, this.ball,
                () => this.redirect_ball(this.paddle2, this.ball)
            );

            if (this.ball.body.blocked.left) {

                this.after_images.help2(this.ball.x, this.ball.y, 30, 1, 0xFF0000);
                this.someone_scored(false);
            } else if (this.ball.body.blocked.right) {
                this.after_images.help2(this.ball.x, this.ball.y, 30, 1, 0xFF0000);
                this.someone_scored(true);
            }
            if (this.ball.body.blocked.up || this.ball.body.blocked.down) {
                SoundManager.getInstance().play(Sounds.Biep, Sounds.volume * 0.5);
            }
        }

        public someone_scored(you_scored: boolean): void {
            this.game.camera.shake(.01, 100);
            SoundManager.getInstance().play(Sounds.ball_destroyed, Sounds.volume * 0.5);

            this.game.add.tween(this.score_text).to({alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.ball.reset_ball(this.game);
            this.paddle1.reset_speed();
            this.paddle2.reset_speed();
            this.paddle2.y = this.game.world.height / 2;
            if (you_scored) {
                this.score1++;
                if (this.score1 === this.end_score) {
                    SoundManager.getInstance().play(Sounds.win, Sounds.volume);
                    if (this.menu.player_count === 2) {
                        this.game_ends('Player 1 wins!');
                    } else {
                        this.game_ends('You have won!');
                    }
                } else {
                    this.UI_Flicker();
                }
            } else {
                this.score2++;
                if (this.score2 === this.end_score) {
                    if (this.menu.player_count === 2) {
                        SoundManager.getInstance().play(Sounds.win, Sounds.volume);
                        this.game_ends('Player 2 wins!');
                    } else {
                        SoundManager.getInstance().play(Sounds.lose, Sounds.volume);
                        this.game_ends('You have lost');
                    }
                } else {
                    this.UI_Flicker();
                }
            }
            this.score_text.text = this.score1 + '   ' + this.score2;

        }

        public game_ends(result: string): void {
            this.in_game = false;
            this.click_to_start_text.text = '';
            this.pauseBtn.visible = false;
            this.resultMenu.label.text = result;
            this.resultMenu.ToggleShow();

        }

        public restart(): void {
            SoundManager.getInstance().stop(Sounds.menu_music);
            SoundManager.getInstance().play(Sounds.in_game_music, Sounds.volume * 1, true);

            this.bg.tint = 0x000000;

            this.score1 = this.score2 = 0;
            this.score_text.text = this.score1 + '   ' + this.score2;

            this.pauseBtn.visible = true;
            this.UI_Flicker();
            this.in_game = true;
            this.in_pause = false;

            this.paddle2.destroy();
            if (this.menu.player_count === 2) {
                this.paddle2 = new PlayerPaddle(this.game, this.game.world.width - 50, this.game.world.height / 2, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);
                this.game.add.tween(this.controls_sprite2).to({alpha: .5}, 400, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);
            } else {
                this.paddle2 = new ComputerPaddle(this.game, this.game.world.width - 50, this.game.world.height / 2, this.ball);
            }
            this.paddle1.reset_speed();
            this.game.add.existing(this.paddle2);
            this.game_layer.add(this.paddle2);

            this.ball.x = this.game.world.centerX;
            this.ball.y = this.game.world.centerY;

            this.game.add.tween(this.controls_sprite1).to({alpha: .5}, 400, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);

            this.controls_show();

        }

        //gives the ball an angle of direction based on where the ball is hitted
        public redirect_ball(paddle: Paddle, ball: Ball): void {
            SoundManager.getInstance().play(Sounds.Biep2, Sounds.volume);

            this.game.camera.shake(.0025, 100);
            this.paddle1.accelerate();
            this.paddle2.accelerate();

            this.after_images.help2(ball.x, ball.y);
            this.bg.tint = this.rgbToHex(Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100));
            let dx: number = -paddle.x + ball.x;
            let dy: number = (-paddle.y + /*paddle.body.velocity.y/20 +*/ ball.y) / 2;
            let root: number = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            dx /= root;
            dy /= root;
            ball.accelerate();
            ball.body.velocity.setTo(
                dx * ball.ball_velocity,
                dy * ball.ball_velocity
            );
        }

        public UI_Flicker(): void {
            this.click_to_start_text.text = 'press spacebar to start!';
            this.click_to_start_text.alpha = 0.1;
            this.game.add.tween(this.click_to_start_text).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);
        }

        private controls_show(): void {
            setTimeout((x: number) => {
                if (this.paddle1.y !== this.game.world.height / 2) {
                    this.removeControlSprite(this.controls_sprite1);
                }
                if (this.paddle2.y !== this.game.world.height / 2) {
                    this.removeControlSprite(this.controls_sprite2);

                }
                if (this.paddle1.y === this.game.world.height / 2 || (this.paddle2.y === this.game.world.height / 2 && this.menu.player_count === 2)) {
                    this.controls_show();
                }
            }, 100);
        }

        private componentToHex(c: number): string {
            let hex: string = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }

        private rgbToHex(r: number, g: number, b: number): number {
            return parseInt('0x' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b), 0);
        }
    }
}
