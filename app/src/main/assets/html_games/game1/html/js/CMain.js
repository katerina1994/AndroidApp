function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var _oLevelMenu;
    var _oCongratulations;

    this.initContainer = function () {
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = false;

        canvas.opacity = 0.5;

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        s_oTweenController = new CTweenController();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            this.onPreloadingComplete();
        }
    };

    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/click.ogg", "click");
            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/broken_stone.ogg", "broken_stone");
            createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
            createjs.Sound.registerSound("./sounds/coin.ogg", "coin");
            createjs.Sound.registerSound("./sounds/game_completed.ogg", "game_completed");
            createjs.Sound.registerSound("./sounds/hero_falling.ogg", "hero_falling");

            createjs.Sound.registerSound("./sounds/hit_axe.ogg", "hit_axe");
            createjs.Sound.registerSound("./sounds/jump.ogg", "jump");
            createjs.Sound.registerSound("./sounds/level_completed.ogg", "level_completed");
            createjs.Sound.registerSound("./sounds/splash.ogg", "splash");
            createjs.Sound.registerSound("./sounds/hero_spike.ogg", "hero_spike");
            
            createjs.Sound.registerSound("./sounds/star.ogg", "star");

        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/click.mp3", "click");
            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/broken_stone.mp3", "broken_stone");
            createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
            createjs.Sound.registerSound("./sounds/coin.mp3", "coin");
            createjs.Sound.registerSound("./sounds/game_completed.mp3", "game_completed");
            createjs.Sound.registerSound("./sounds/hero_falling.mp3", "hero_falling");

            createjs.Sound.registerSound("./sounds/hit_axe.mp3", "hit_axe");
            createjs.Sound.registerSound("./sounds/jump.mp3", "jump");
            createjs.Sound.registerSound("./sounds/level_completed.mp3", "level_completed");
            createjs.Sound.registerSound("./sounds/splash.mp3", "splash");
            createjs.Sound.registerSound("./sounds/hero_spike.mp3", "hero_spike");
            
            createjs.Sound.registerSound("./sounds/star.mp3", "star");

        }

        RESOURCE_TO_LOAD += 13;

    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_restart_big", "./sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("but_exit_big", "./sprites/but_exit_big.png");

        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_ice", "./sprites/bg_ice.jpg");
        s_oSpriteLibrary.addSprite("bg_mountain", "./sprites/bg_mountain.jpg");
        s_oSpriteLibrary.addSprite("bg_volcano", "./sprites/bg_volcano.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("player", "./sprites/player.png");
        s_oSpriteLibrary.addSprite("game_completed_panel", "./sprites/game_completed_panel.png");
        s_oSpriteLibrary.addSprite("level_completed_panel", "./sprites/level_completed_panel.png");
        s_oSpriteLibrary.addSprite("game_over_panel", "./sprites/game_over_panel.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("sea", "./sprites/sea.png");
        
        s_oSpriteLibrary.addSprite("help_mouse", "./sprites/help_mouse.png");
        s_oSpriteLibrary.addSprite("help_touch", "./sprites/help_touch.png");

        s_oSpriteLibrary.addSprite("star", "./sprites/star.png");

        s_oSpriteLibrary.addSprite("object_0", "./sprites/object_0.png");
        s_oSpriteLibrary.addSprite("object_1", "./sprites/object_1.png");

        s_oSpriteLibrary.addSprite("parallaxe_ice_0", "./sprites/parallaxe_ice_0.png");

        s_oSpriteLibrary.addSprite("parallaxe_mountain_0", "./sprites/parallaxe_mountain_0.png");

        s_oSpriteLibrary.addSprite("parallaxe_volcano_0", "./sprites/parallaxe_volcano_0.png");
        s_oSpriteLibrary.addSprite("parallaxe_volcano_1", "./sprites/parallaxe_volcano_1.png");

        s_oSpriteLibrary.addSprite("arrival_0", "./sprites/arrival_0.png");
        s_oSpriteLibrary.addSprite("arrival_1", "./sprites/arrival_1.png");

        s_oSpriteLibrary.addSprite("platform_ice_0", "./sprites/platform_ice_0.png");
        s_oSpriteLibrary.addSprite("platform_ice_1", "./sprites/platform_ice_1.png");

        s_oSpriteLibrary.addSprite("platform_mountain_0", "./sprites/platform_mountain_0.png");
        s_oSpriteLibrary.addSprite("platform_mountain_1", "./sprites/platform_mountain_1.png");

        s_oSpriteLibrary.addSprite("platform_volcano_0", "./sprites/platform_volcano_0.png");
        s_oSpriteLibrary.addSprite("platform_volcano_1", "./sprites/platform_volcano_1.png");
	s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");


        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
        if (_iCurResource === RESOURCE_TO_LOAD) {
            this.onPreloadingComplete();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
            s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
        }

        this.loadJSON();

        this._loadImages();
        _bUpdate = true;
    };

    this.onLoadedJSON = function (data) {
        s_aLevelDiagram = data;
    };

    this.loadJSON = function () {
        jQuery.getJSON(URL_LEVELS_SETTINGS, this.onLoadedJSON);
    };
    
    this.onPreloadingComplete = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
        _oPreloader.unload();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            s_oSoundTrack = createjs.Sound.play("soundtrack", {loop: -1});
        }
        this.gotoMenu();
    }

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iLevel) {
        _oGame = new CGame(_oData, iLevel);
        _iState = STATE_GAME;

        $(s_oMain).trigger("start_session");
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu(_oData);
        _iState = STATE_MENU;
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.gotoCongratulations = function (oResult, iScore) {
        _oCongratulations = new CCongratulations(oResult, iScore);
        _iState = STATE_MENU;
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
		createjs.Sound.setMute(true);
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");

        if(s_bAudioActive){
                createjs.Sound.setMute(false);
        }
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;

    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iAdsLevel = 1;
var s_iLevelReached = 1;
var s_aScores;
var s_aPercentage;
var s_aLevelDiagram;
var s_oTweenController;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;
var s_bFullscreen = false;
var s_bStorageAvailable = true;