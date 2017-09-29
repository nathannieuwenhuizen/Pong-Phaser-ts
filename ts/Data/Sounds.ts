class Sounds {
    public static Click: string = 'click';
    public static Biep: string = 'objects/biep';
    public static Biep2: string = 'objects/biep2';
    public static in_game_music: string = 'Superboy';
    public static menu_music: string = 'Adventure_Meme';
    public static ball_destroyed: string = 'objects/ball_destroy';
    public static launch: string = 'objects/launch';
    public static button_hover: string = 'ui/button_hover';
    public static button_click: string = 'ui/button_press';
    public static win: string = 'ui/win';
    public static lose: string = 'ui/lose';
    /**
     * A list of all audio we need for the preloader.
     */
    public static preloadList: string[] = [
        Sounds.Click,
        Sounds.Biep,
        Sounds.Biep2,
        Sounds.in_game_music,
        Sounds.menu_music,
        Sounds.ball_destroyed,
        Sounds.launch,
        Sounds.button_hover,
        Sounds.button_click,
        Sounds.win,
        Sounds.lose
    ];
    public static volume: number = 0;
    /**
     * A list of all audio we need after the preloader.
     */
    public static list: string[] = [
        //Add audio to load
    ];
}
