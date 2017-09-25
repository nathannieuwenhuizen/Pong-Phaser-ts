class Main_Menu{
    public graphics: Phaser.Graphics;
    public game: Fabrique.IGame;
    public testGrBtn: LabeledButton;
    public label: Label;
    public gameplay: Gameplay;
    constructor(x:number, y:number, game: Fabrique.IGame, gameplay: Gameplay){
        this.game = game;
        this.gameplay = gameplay;
        this.graphics = game.add.graphics(0, 0);

        // set a fill and line style
        this.graphics.beginFill(0x000);
        this.graphics.drawRect(0,0, game.width, game.height );

        var callback = this.play;
        this.testGrBtn = new LabeledButton(game, x, y, 'Play', {
            font: '63px Pong',
            fill: '#fff',
            align: 'center'
        }, callback, this, 300, 100);
        this.testGrBtn.createTexture(0x1a1a1a);

        this.label = new Label( game, x, y - 200, 'PONG', {
                font: '100px Pong',
                fill: '#fff',
                align: 'center'}
            , 400, 100);
        this.label.anchor.set(0.5);

        this.graphics.addChild(this.testGrBtn);
        this.graphics.addChild(this.label);
    }
    public play(): void{
        this.gameplay.restart();
        this.graphics.visible = false;

    }
    public back_to_menu():void{
        this.graphics.visible = true;
    }
}