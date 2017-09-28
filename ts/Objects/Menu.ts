class Main_Menu {
    public graphics: Phaser.Graphics;
    public game: Fabrique.IGame;
    public testGrBtn: LabeledButton;
    public mode_button: LabeledButton;
    public label: Label;
    public gameplay: Gameplay;
    public player_count: number = 1;

    constructor(x: number, y: number, game: Fabrique.IGame, gameplay: Gameplay) {

        this.game = game;
        this.gameplay = gameplay;
        this.graphics = game.add.graphics(0, 0);

        // set a fill and line style
        this.graphics.beginFill(0x000);
        this.graphics.drawRect(0, 0, game.width, game.height);

        this.testGrBtn = new LabeledButton(game, x, y, 'Play', {
            font: '60px Pong',
            fill: '#fff',
            align: 'center'
        }, this.play, this, 300, 100);
        this.testGrBtn.createTexture(0x1a1a1a);

        this.testGrBtn.events.onInputOver.add(this.button_hover, this.testGrBtn);
        this.testGrBtn.events.onInputOut.add(this.button_unhover, this.testGrBtn);
        this.mode_button = new LabeledButton(game, x, y + 150, '1 player', {
            font: '25px Pong',
            fill: '#fff',
            align: 'center'
        }, this.switch_player_count, this, 300, 100);
        this.mode_button.createTexture(0x1a1a1a);
        this.mode_button.events.onInputOver.add(this.button_hover, this.mode_button);
        this.mode_button.events.onInputOut.add(this.button_unhover, this.mode_button);

        this.label = new Label(game, x, y - 200, 'PONG', {
                font: '100px Pong',
                fill: '#fff',
                align: 'center'
            }
            , 400, 100);
        this.label.anchor.set(0.5);

        this.graphics.addChild(this.testGrBtn);
        this.graphics.addChild(this.mode_button);
        this.graphics.addChild(this.label);

    }

    public button_hover(button: LabeledButton): void {
        this.game.add.tween(button).to({alpha: .5}, 400, Phaser.Easing.Linear.None, true, 0, 600, true).loop(true);
    }

    public button_unhover(button: LabeledButton): void {
        button.alpha = 1;
        this.game.tweens.removeFrom(button);
    }

    public play(): void {
        this.testGrBtn.alpha = 1;
        this.game.tweens.removeFrom(this.testGrBtn);

        this.gameplay.restart();
        this.graphics.visible = false;

    }

    public back_to_menu(): void {
        this.graphics.visible = true;
    }

    public switch_player_count(): void {
        switch (this.player_count) {
            case 1:
                this.mode_button.setText('2 players');
                this.player_count = 2;
                break;
            default:
                this.mode_button.setText('1 player');
                this.player_count = 1;
                break;
        }
    }
}