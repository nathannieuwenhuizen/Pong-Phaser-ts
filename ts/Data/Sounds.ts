class Sounds {
    public static Click: string = 'click';
    public static Biep: string = 'biep';
    public static Biep2: string = 'biep2';

    /**
     * A list of all audio we need for the preloader.
     */
    public static preloadList: string[] = [
        Sounds.Click,
        Sounds.Biep,
        Sounds.Biep2
    ];

    /**
     * A list of all audio we need after the preloader.
     */
    public static list: string[] = [
        //Add audio to load
    ];
}
