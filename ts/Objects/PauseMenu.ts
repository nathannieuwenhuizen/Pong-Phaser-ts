import LabeledButton = BoilerPlate.LabeledButton;
import Gameplay = BoilerPlate.Gameplay;

class PauseMenu{
    public  testGrBtn: LabeledButton;
    public  testGrBtn2: LabeledButton;
    public graphics: Phaser.Graphics;
    public  gamePlay: Gameplay;
    private label: Label;
    public game: Fabrique.IGame;
    public x: number;
    public y: number;
    constructor(_x:number, _y: number, game: Fabrique.IGame, title: string, text_top: string, text_bottom: string, gamePlay:Gameplay, resume_or_restart: boolean = false  ){
        this.x = _x;
        this.y = _y;
        this.game = game;
        this.gamePlay = gamePlay
//Create a texture with shadow and use it as the texture of the button.
        this.graphics = game.add.graphics(0, 0);

        // set a fill and line style
        this.graphics.beginFill(0x000);
        this.graphics.fillAlpha = 0.3;
        this.graphics.drawRect(0, 0, this.game.width, this.game.height );
        this.graphics.fillAlpha = 1;
        this.graphics.lineStyle(5, 0xffffff, 1);

        var callBack_top
        if(resume_or_restart){
            callBack_top = this.ToggleShow;
        }
        else{
            callBack_top = this.restart;
        }
        var callback_bottom = this.back_to_menu;

        this.graphics.drawRect(this.x - 150 - 50, this.y - 100 - 50, 400, 360 );
        this.testGrBtn = new LabeledButton(game, this.x, this.y, text_top, {
            font: '25px Pong',
            fill: '#fff',
            align: 'center'
        }, callBack_top, this, 300, 100);
        this.testGrBtn.createTexture(0x1a1a1a);

        this.testGrBtn2 = new LabeledButton(game, this.x, this.y+ 110, text_bottom, {
            font: '25px Pong',
            fill: '#fff',
            align: 'center'
        }, callback_bottom, this, 300, 100);
        this.testGrBtn2.createTexture(0x1a1a1a);

        this.label = new Label( game, this.x, this.y-100, title,{
            font: '33px Pong',
            fill: '#fff',
            align: 'center'}
            , 400, 100);
        this.label.anchor.set(0.5);

        this.graphics.addChild(this.testGrBtn);
        this.graphics.addChild(this.testGrBtn2);
        this.graphics.addChild(this.label);
        this.ToggleShow();
    }
    public ToggleShow():void{
        if(this.graphics.visible == false)
        {
            this.graphics.visible = true;

            this.gamePlay.ball.body.moves = this.gamePlay.paddle2.body.moves  = false;

            this.gamePlay.in_pause = true;
        } else {
            this.graphics.visible = false;

            this.gamePlay.ball.body.moves = this.gamePlay.paddle2.body.moves  = true;

            this.gamePlay.in_pause = false;
        }
    }
    public restart():void{
        this.ToggleShow();
        this.gamePlay.restart();
    }
    public back_to_menu(){
        this.ToggleShow();
        this.gamePlay.back_to_menu();
    }
}