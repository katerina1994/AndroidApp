function CMenu() {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosContinue;
    var _pStartPosInfo;
    var _pStartPosFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButFullscreen;
    var _oBg;
    var _oButPlay;
    var _oButInfo;
    var _oButContinue;
    var _oLogo;
    var _oFade;
    var _oResetPanel = null;
    var _oAudioToggle;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 90};
        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        
        if (getItem("olaf_levelreached") !== null) {
            s_iLevelReached = getItem("olaf_levelreached");
            s_aScores = JSON.parse(getItem("olaf_scores"));
            s_aPercentage = JSON.parse(getItem("olaf_percentage"));

            _pStartPosPlay = {x: CANVAS_WIDTH / 2 - 200, y: CANVAS_HEIGHT - 90};
            _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y);

            _pStartPosContinue = {x: CANVAS_WIDTH / 2 + 200, y: CANVAS_HEIGHT - 90};

            var oSpriteContiune = s_oSpriteLibrary.getSprite('but_continue');
            _oButContinue = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContiune, s_oStage);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
            _oButContinue.pulseAnimation();
        } else {
            _oButPlay.pulseAnimation();
            this.resetArrays();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteInfo = s_oSpriteLibrary.getSprite("but_info");
        _pStartPosInfo = {x: (oSpriteInfo.width / 2) + 10, y: (oSpriteInfo.height / 2) + 10};
        _oButInfo = new CGfxButton(_pStartPosInfo.x, _pStartPosInfo.y, oSpriteInfo, s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosInfo.x + oSprite.width/2 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oLogo = new CLogo(CANVAS_WIDTH * 0.5, -200);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 800).call(function () {
            _oFade.visible = false;
        });

        _oLogo.playAnimation();
        
        if(!s_bStorageAvailable){
            new CMsgBox(TEXT_ERR_LS,s_oStage);
        }

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y - iNewY);
        if (_oButContinue) {
            _oButContinue.setPosition(_pStartPosContinue.x, _pStartPosContinue.y - iNewY);
        }
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX, _pStartPosInfo.y + iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }

        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();

        s_oMenu = null;
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };

    this._onButInfoRelease = function () {
        var oCreditsPanel = new CCreditsPanel();
    };

    this._onButNo = function () {
        _oResetPanel.unload();
        _oResetPanel = null;
    };

    this._onButYes = function () {
        clearAllItem();
        this.unload();
        s_iLevelReached = 1;
        this.resetArrays();
        s_oMain.gotoLevelMenu();
    };

    this._onButContinueRelease = function () {
        this.unload();
        playSound("click", 1, 0);
        s_oMain.gotoLevelMenu();
    };

    this.resetArrays = function () {
        s_aScores = new Array();
        s_aPercentage = new Array();
        for (var i = 0; i < s_aLevelDiagram.length; i++) {
            s_aScores[i] = 0;
            s_aPercentage[i] = 0;
        }
    };

    this._onButPlayRelease = function () {
        if (getItem("olaf_levelreached") === null) {
            this.unload();
            playSound("click", 1, 0);
            s_oMain.gotoLevelMenu();
        } else {
            if (_oResetPanel === null) {
                _oResetPanel = new CConfirmPanel(TEXT_RESET, CONFIRMATION_RESET);
                _oResetPanel.addEventListener(ON_BUT_NO_DOWN, this._onButNo, this);
                _oResetPanel.addEventListener(ON_BUT_YES_DOWN, this._onButYes, this);
            }
        }
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;