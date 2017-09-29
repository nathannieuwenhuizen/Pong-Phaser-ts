import Emitter = Phaser.Particles.Arcade.Emitter;

class Ball extends Phaser.Graphics {
    public ball_velocity: number = 500;
    public ball_launched: boolean = false;
    public min_velocity: number = 500;
    public max_velocity: number = 800;
    private emitter: Emitter;

    constructor(x: number, y: number, game: Fabrique.IGame) {
        super(game, x, y);
        this.beginFill(0xFFFFFF);
        this.drawCircle(0, 0, 20);
        game.physics.arcade.enable(this);

        this.boundsPadding = 0;
        this.pivot.set(0, 0);

        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        this.scale.set(1, 1);
        this.body.velocity.x = 0;

        let temp: Phaser.Graphics = game.add.graphics(0, 0);

        temp.beginFill(0xFFFFFF);
        temp.drawCircle(0, 0, 20);

    }

    public launch(): void {
        if (!this.ball_launched) {
            this.ball_launched = true;
            let dx: number = (-0.5 + Math.random() * 1) * 10;
            let dy: number = -0.5 + Math.random() * 1;
            let root: number = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            dx /= root;
            dy /= root;
            this.body.velocity.set(dx * this.ball_velocity, dy * this.ball_velocity);

            //this.ball.body.velocity.y = -this.ball_velocity;
        }
    }

    public reset_ball(game: Fabrique.IGame): void {
        this.ball_launched = false;
        this.body.velocity.setTo(0, 0);
        this.x = game.world.centerX;
        this.y = game.world.centerY;
        this.ball_velocity = this.min_velocity;
    }

    public accelerate(): void {
        if (this.ball_velocity < this.max_velocity) {
            this.ball_velocity += 20;
        }
    }
}
