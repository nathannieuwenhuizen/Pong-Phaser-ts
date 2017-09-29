import LabeledButton = BoilerPlate.LabeledButton;
import Gameplay = BoilerPlate.Gameplay;
import SoundManager = BoilerPlate.SoundManager;

class PauseMenu {
    public testGrBtn: LabeledButton;
    public testGrBtn2: LabeledButton;
    public graphics: Phaser.Graphics;
    public gamePlay: Gameplay;
    public label: Phaser.Text;
    public game: Fabrique.IGame;
    public x: number;
    public y: number;

    constructor(_x: number, _y: number, game: Fabrique.IGame, title: string, text_top: string, text_bottom: string, gamePlay: Gameplay, resume_or_restart: boolean = false) {
        this.x = _x;
        this.y = _y;
        this.game = game;
        this.gamePlay = gamePlay;
//Create a texture with shadow and use it as the texture of the button.
        this.graphics = game.add.graphics(0, 0);

        // set a fill and line style
        this.graphics.beginFill(0x000);
        this.graphics.fillAlpha = 0.3;
        this.graphics.drawRect(0, 0, this.game.width, this.game.height);
        this.graphics.fillAlpha = 1;
        this.graphics.lineStyle(5, 0xffffff, 1);

        let callBack_top: any;
        if (resume_or_restart) {
            callBack_top = this.Resume;
        } else {
            callBack_top = this.restart;
        }
        let callback_bottom: any = this.back_to_menu;

        this.graphics.drawRect(this.x - 150 - 50, this.y - 100 - 50, 400, 360);
        this.testGrBtn = new LabeledButton(game, this.x, this.y, text_top, {
            font: '25px Pong',
            fill: '#fff',
            align: 'center'
        }, callBack_top, this, 300, 100);
        this.testGrBtn.createTexture(0x1a1a1a);

        this.testGrBtn.events.onInputOver.add(this.button_hover, this.testGrBtn);
        this.testGrBtn.events.onInputOut.add(this.button_unhover, this.testGrBtn);

        this.testGrBtn2 = new LabeledButton(game, this.x, this.y + 110, text_bottom, {
            font: '25px Pong',
            fill: '#fff',
            align: 'center'
        }, callback_bottom, this, 300, 100);
        this.testGrBtn2.createTexture(0x1a1a1a);
        this.testGrBtn2.events.onInputOver.add(this.button_hover, this.testGrBtn);
        this.testGrBtn2.events.onInputOut.add(this.button_unhover, this.testGrBtn);

        this.label = new Phaser.Text(game, this.x, this.y - 100, title, {
            font: '33px Pong',
            fill: '#fff',
            align: 'center'
        });
        this.label.anchor.set(0.5);

        this.graphics.addChild(this.testGrBtn);
        this.graphics.addChild(this.testGrBtn2);
        this.graphics.addChild(this.label);
        this.ToggleShow();
    }

    public Resume(): void {
        SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);
        this.ToggleShow();
    }

    public ToggleShow(): void {

        this.button_unhover(this.testGrBtn);
        this.button_unhover(this.testGrBtn2);
        if (!this.graphics.visible) {
            this.graphics.visible = true;
            this.gamePlay.ball.body.moves = this.gamePlay.paddle2.body.moves = false;
            this.gamePlay.in_pause = true;
        } else {
            this.graphics.visible = false;
            this.gamePlay.ball.body.moves = this.gamePlay.paddle2.body.moves = true;
            this.gamePlay.in_pause = false;
        }
    }

    public button_hover(button: LabeledButton): void {
        this.game.add.tween(button).to({alpha: .5}, 400, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);
    }

    public button_unhover(button: LabeledButton): void {
        this.game.tweens.removeFrom(button);
        button.alpha = 1;
    }

    public restart(): void {

        SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);
        this.button_unhover(this.testGrBtn);
        this.ToggleShow();
        this.gamePlay.restart();

    }

    public back_to_menu(): void {
        SoundManager.getInstance().play(Sounds.button_click, Sounds.volume * 0.5);
        this.button_unhover(this.testGrBtn2);
        this.ToggleShow();
        this.gamePlay.back_to_menu();
    }
}
