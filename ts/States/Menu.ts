module BoilerPlate {
    export class Menu extends Phaser.State implements Fabrique.IState {
        public static Name: string = 'menu';

        public name: string = Menu.Name;
        public game: Fabrique.IGame;
        public graphics: Phaser.Graphics;
        public game: Fabrique.IGame;
        public testGrBtn: LabeledButton;
        public mode_button: LabeledButton;
        public label: Phaser.Text;
        public gameplay: Gameplay;
        // private background: Phaser.Image;
        // private logo: Phaser.Image;
        // private testImgBtn: LabeledButton;
        private testGrBtn: LabeledButton;
        private sound_image: Phaser.Sprite;
        private filter: VoidFilter;

        constructor() {
            super();
        }

        public init(): void {
            this.game.world.removeAll();

            Save.Game.getInstance(this.game);
            SoundManager.getInstance(this.game);
        }

        public create(): void {
            super.create();

            //Send a screen view to Google to track different states
            // this.game.analytics.google.sendScreenView(this.name);
            /*
            this.background = this.game.add.image(0, 0, Atlases.Interface, 'bg_menu');

            this.logo = this.game.add.image(0, 0, Atlases.Interface, 'OG_logo_fullcolor');
            this.logo.anchor.set(0.5);

            let textStyle: any = {font: 'bold ' + 30 * Constants.GAME_SCALE + 'px Arial', fill: '#FFFFFF'};

            //This button uses images for textures, just like normal Phaser.Buttons
            this.testImgBtn = new LabeledButton(this.game, 0, 0, 'LONG TEXT FITS IN BUTTON', textStyle, this.buttonClick, this);
            this.testImgBtn.setFrames('btn_orange', 'btn_orange', 'btn_orange_onpress', 'btn_orange');

            //This button is made by generating the texture with graphics
            this.testGrBtn = new LabeledButton(this.game, 0, 0, 'PLAY', textStyle, this.startGame, this, 300, 100);
            this.testGrBtn.createTexture(0xf98f25);

            this.startGame();*/
            this.resize();

            let x: number = this.game.width / 2;
            let y: number = this.game.height / 2;
            this.graphics = this.game.add.graphics(0, 0);

            // set a fill and line style
            this.graphics.beginFill(0x000);
            this.graphics.drawRect(0, 0, this.game.width, this.game.height);

            this.testGrBtn = new LabeledButton(this.game, x, y, 'Play', {
                font: '60px Pong',
                fill: '#fff',
                align: 'center'
            }, this.startGame, this, 300, 100);
            this.testGrBtn.createTexture(0x1a1a1a);

            this.testGrBtn.events.onInputOver.add(this.button_hover, this.testGrBtn);
            this.testGrBtn.events.onInputOut.add(this.button_unhover, this.testGrBtn);
            this.mode_button = new LabeledButton(this.game, x, y + 150, '1 player', {
                font: '25px Pong',
                fill: '#fff',
                align: 'center'
            }, this.switch_player_count, this, 300, 100);
            this.mode_button.createTexture(0x1a1a1a);
            this.mode_button.events.onInputOver.add(this.button_hover, this.mode_button);
            this.mode_button.events.onInputOut.add(this.button_unhover, this.mode_button);

            this.label = new Phaser.Text(this.game, x, y - 200, 'PONG', {
                font: '100px Pong',
                fill: '#fff',
                align: 'center'
            });
            this.label.anchor.set(0.5);

            this.sound_image = this.game.add.sprite(this.game.width - 50, this.game.height - 50, Images.Sound_On);
            this.sound_image.width = this.sound_image.height = 50;
            this.sound_image.anchor.set(.5);
            this.sound_image.inputEnabled = true;
            this.sound_image.events.onInputDown.add(this.switch_sound, this);

            this.graphics.addChild(this.testGrBtn);
            this.graphics.addChild(this.mode_button);
            this.graphics.addChild(this.label);
            this.graphics.addChild(this.sound_image);

            this.filter = new VoidFilter(this.game);
            let sprite: Phaser.Sprite = this.game.add.sprite(0, 0);
            sprite.width = this.game.width;
            sprite.height = this.game.height;
            sprite.alpha = 0.1;
            sprite.filters = [this.filter.filter_effect];

            this.update_sound_image();
            this.update_button_text();
        }

        public update(): void {
            this.filter.filter_effect.update(0);
        }

        /**
         * Called every time the rotation or game size has changed.
         * Rescales and repositions the objects.
         */
        public resize(): void {
            //this.background.width = this.game.width;
            //this.background.height = this.game.height;

            //Reset logo scaling because we're gonna use its size to recalculate the assets scaling
            //this.logo.scale.set(1);

            //Calculate new scaling based on the logo size
            // let assetsScaling: number = 1;
            // if (this.game.width > this.game.height) {
            //     assetsScaling = this.game.width / (this.logo.width * 1.5);
            // } else {
            //     assetsScaling = this.game.width / this.logo.width;
            // }
            //Check that the scaling is not bigger than 1 to prevent unnecessary blurriness
            //assetsScaling = assetsScaling > 1 ? 1 : assetsScaling;

            //Set the new scaling and reposition the logo
            //this.logo.scale.set(assetsScaling);
            //this.logo.alignIn(this.world.bounds, Phaser.CENTER, 0, -60 * Constants.GAME_SCALE);

            //Do the same for the the buttons
            /*this.testImgBtn.updateScaling(assetsScaling);
            this.testImgBtn.x = this.logo.x / 2;
            this.testImgBtn.y = this.logo.y + this.logo.height * 0.65;

            this.testGrBtn.updateScaling(assetsScaling);
            this.testGrBtn.x = this.logo.x + this.logo.x / 2;
            this.testGrBtn.y = this.testImgBtn.y;*/
        }

        public button_hover(button: LabeledButton): void {
            //SoundManager.getInstance().play(Sounds.button_hover, Sounds.volume * 0.5);
            this.game.add.tween(button).to({alpha: .5}, 400, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);
        }

        public button_unhover(button: LabeledButton): void {
            button.alpha = 1;
            this.game.tweens.removeFrom(button);
        }

        public back_to_menu(): void {
            this.graphics.visible = true;
        }

        public switch_player_count(): void {
            SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);

            switch (Constants.PLAYER_COUNT) {
                case 1:
                    Constants.PLAYER_COUNT = 2;
                    break;
                default:
                    Constants.PLAYER_COUNT = 1;
                    break;
            }
            this.update_button_text();
        }

        public switch_sound(): void {

            if (Sounds.volume === 1) {
                Sounds.volume = 0;
                this.sound_image.loadTexture(Images.Sound_Off);
                this.game.sound.mute = true;
                SoundManager.getInstance().stop(Sounds.menu_music);
            } else {
                Sounds.volume = 1;
                this.sound_image.loadTexture(Images.Sound_On);
                this.game.sound.mute = false;
                SoundManager.getInstance().play(Sounds.menu_music, Sounds.volume * 0.5, true);

            }
            this.update_sound_image();
        }

        public update_sound_image(): void {
            if (Sounds.volume === 0) {
                this.sound_image.loadTexture(Images.Sound_Off);
            } else {
                this.sound_image.loadTexture(Images.Sound_On);
            }
        }

        public update_button_text(): void {
            if (Constants.PLAYER_COUNT === 2) {
                this.mode_button.setText('2 players');
            } else {
                this.mode_button.setText('1 player');
            }
        }

        /**
         * Start the gameplay state
         */
        private startGame(): void {

            SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);

            this.testGrBtn.alpha = 1;
            this.game.tweens.removeFrom(this.testGrBtn);

            //this.gameplay.restart();
            this.graphics.visible = false;
            this.game.state.add(Gameplay.Name, Gameplay, true);
        }
    }
}
