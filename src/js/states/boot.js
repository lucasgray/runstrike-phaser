
export default class Boot extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', 'img/loader-bg.png');
        this.load.image('loaderBar', 'img/loader-bar.png');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //  var x = this.calculateScreenMetrics(1920,1080);
        //  this.game.scale.setUserScale(x.scaleX, x.scaleY, x.offsetX, x.offsetY);
        //  this.game.scale.pageAlignVertically = true;
        //  this.game.scale.pageAlignHorizontally = true;
        //  this.game.scale.refresh();

        this.state.start('Preload');
    }

    calculateScreenMetrics(defaultWidth, defaultHeight, maxGameWidth, maxGameHeight) {

        var globals = {
            "screen" : {
                width: 1920,
                height: 1080,
            }
        };

        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        // Calculate the game's max dimensions. The bounds are iPad and iPhone for now.
        if (typeof maxGameWidth === "undefined" || typeof maxGameHeight === "undefined") {
            maxGameWidth = Math.round(defaultWidth * defaultWidth / defaultHeight);
            maxGameHeight = Math.round(defaultHeight * defaultWidth / defaultHeight);
        }

        // Calculate aspect ratios
        var defaultAspect = globals.screen.width / globals.screen.height,
            windowAspect = windowWidth / windowHeight,
            offsetX = 0,
            offsetY = 0,
            gameWidth = 0,
            gameHeight = 0;

        if (windowAspect > defaultAspect) {
            gameHeight = defaultHeight;
            gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
            gameWidth = Math.min(gameWidth, maxGameWidth);
            offsetX = (gameWidth - defaultWidth) / 2;
            offsetY = 0;
        } else {
            gameWidth = defaultWidth;
            gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
            gameHeight = Math.min(gameHeight, maxGameHeight);
            offsetX = 0;
            offsetY = (gameHeight - defaultHeight) / 2;
        }

        // calculate scale
        var scaleX = windowWidth / gameWidth,
            scaleY = windowHeight / gameHeight;


        return {
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            defaultGameWidth: defaultWidth,
            defaultGameHeight: defaultHeight,
            maxGameWidth: maxGameWidth,
            maxGameHeight: maxGameHeight,
            gameWidth: gameWidth,
            gameHeight: gameHeight,
            scaleX: scaleX,
            scaleY: scaleY,
            offsetX: offsetX,
            offsetY: offsetY
        };

    }

}
