class Sounds {
    public static Click: string = 'click';
    public static Biep: string = 'biep';
    public static Biep2: string = 'biep2';
    public static in_game_music: string = 'Superboy';
    public static menu_music: string = 'Adventure_Meme';

    /**
     * A list of all audio we need for the preloader.
     */
    public static preloadList: string[] = [
        Sounds.Click,
        Sounds.Biep,
        Sounds.Biep2,
        Sounds.in_game_music,
        Sounds.menu_music
    ];

    /**
     * A list of all audio we need after the preloader.
     */
    public static list: string[] = [
        //Add audio to load
    ];
}
