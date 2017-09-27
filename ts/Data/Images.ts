class Images {

    /**
     * A list of all images we need to show the preloader itself.
     * These should be loaded in the splash screen.
     */
    public static Paddle: string = 'paddle'
    public static Ball: string = 'ball'
    public static Pause: string = 'pause'
    public static Close: string = 'close'
    public static Controls_1: string = 'controls2'
    public static Controls_2: string = 'controls'
    public static preloadList: string[] = [
        //Add images for the preloader
        Images.Paddle,
        Images.Ball,
        Images.Pause,
        Images.Close,
        Images.Controls_1,
        Images.Controls_2
    ];

    /**
     * A list of all images we need after the preloader.
     */
    public static list: string[] = [
        //Add images to load
    ];
}
