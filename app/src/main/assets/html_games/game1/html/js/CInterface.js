function CInterface() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosPause;
    var _pStartPosScore;
    var _pStartPosCounter;
    var _pStartPosFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButFullscreen;
    var _oButExit;
    var _oButPause;
    var _oHelpPanel;
    var _oAudioToggle = null;
    var _oLosePanel = null;
    var _oWinPanel = null;
    var _oPause;
    var _oScoreTextContainer;
    var _oScoreText;
    var _oScoreTextStroke;
    var _oCounterLvTextContainer;
    var _oCounterLvText;
    var _oCounterLvTextStroke;
    var _oAreYouSure;
    var _oCongratulations = null;

    this._init = function () {

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onPause, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            if (_oAudioToggle === null) {
                _pStartPosFullscreen = {x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y};
            }else{
                _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2 - 10,y:oSprite.height/2 + 10};
            }
            trace("_pStartPosFullscreen: "+_pStartPosFullscreen.x+","+_pStartPosFullscreen.y)

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _pStartPosScore = {x: CANVAS_WIDTH / 2 - 75, y: 53};

        _oScoreTextContainer = new createjs.Container();
        _oScoreTextContainer.x = _pStartPosScore.x;
        _oScoreTextContainer.y = _pStartPosScore.y;

        _oScoreTextStroke = new createjs.Text(TEXT_SCORE + " 0", "normal " + 36 + "px " + FONT_GAME, "#000000");
        _oScoreTextStroke.textAlign = "left";
        _oScoreTextStroke.textBaseline = "alphabetic";
        _oScoreTextStroke.x = 0;
        _oScoreTextStroke.y = 0;
        _oScoreTextStroke.outline = 3;

        _oScoreTextContainer.addChild(_oScoreTextStroke);

        _oScoreText = new createjs.Text(TEXT_SCORE + " 0", "normal " + 36 + "px " + FONT_GAME, TEXT_COLOR);
        _oScoreText.textAlign = "left";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.x = 0;
        _oScoreText.y = 0;

        _oScoreTextContainer.addChild(_oScoreText);

        this.createLevelCounter();

        _oAreYouSure = new CAreYouSurePanel(s_oStage);

        s_oStage.addChild(_oScoreTextContainer);

        _oHelpPanel = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite('msg_box'));

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX, iNewY + _pStartPosPause.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oScoreTextContainer.y = _pStartPosScore.y + iNewY;
        
        _oCounterLvTextContainer.x = _pStartPosCounter.x + iNewX;
        _oCounterLvTextContainer.y = _pStartPosCounter.y + iNewY;
    };

    this.createLevelCounter = function () {

        _pStartPosCounter = {x: 10, y: 53};

        _oCounterLvTextContainer = new createjs.Container();
        _oCounterLvTextContainer.x = _pStartPosCounter.x;
        _oCounterLvTextContainer.y = _pStartPosCounter.y;

        _oCounterLvTextStroke = new createjs.Text(TEXT_LEVEL + " 0", "normal " + 36 + "px " + FONT_GAME, "#000000");
        _oCounterLvTextStroke.textAlign = "left";
        _oCounterLvTextStroke.textBaseline = "alphabetic";
        _oCounterLvTextStroke.x = 0;
        _oCounterLvTextStroke.y = 0;
        _oCounterLvTextStroke.outline = 3;

        _oCounterLvTextContainer.addChild(_oCounterLvTextStroke);

        _oCounterLvText = new createjs.Text(TEXT_LEVEL + " 0", "normal " + 36 + "px " + FONT_GAME, TEXT_COLOR);
        _oCounterLvText.textAlign = "left";
        _oCounterLvText.textBaseline = "alphabetic";
        _oCounterLvText.x = 0;
        _oCounterLvText.y = 0;

        _oCounterLvTextContainer.addChild(_oCounterLvText);
        
        s_oStage.addChild(_oCounterLvTextContainer);
    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;
        _oButPause.unload();
        _oButPause = null;

        if (_oAreYouSure) {
            _oAreYouSure.unload();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }

        s_oInterface = null;
    };

    this.createLosePanel = function (iScore) {
        _oLosePanel = new CLosePanel(s_oSpriteLibrary.getSprite("game_over_panel"), iScore);
    };

    this.createWinPanel = function (iScore, iPercent, iLvScore, iPrecScore, iLv) {
        _oWinPanel = new CWinPanel(s_oSpriteLibrary.getSprite("level_completed_panel"), iScore, iPercent, iLvScore, iPrecScore, iLv);
    };

    this.createCongratulations = function (iScore, iPercent, iLvScore, iPrecScore) {
        _oCongratulations = new CCongratulations(s_oSpriteLibrary.getSprite("game_completed_panel"), iScore, iPercent, iLvScore, iPrecScore);
    };

    this.unloadHelpPanel = function () {
        if (_oHelpPanel) {
            _oHelpPanel.unload();
            _oHelpPanel = null;
        }
    };

    this.createPauseInterface = function () {
        _oPause = new CPause();
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        _oAreYouSure.show();
    };

    this.refreshScore = function (iScore) {
        _oScoreText.text = TEXT_SCORE + " " + iScore;
        _oScoreTextStroke.text = TEXT_SCORE + " " + iScore;
    };

    this.refreshLevelCounter = function (iLv) {
        _oCounterLvText.text = TEXT_LEVEL + ": " + iLv;
        _oCounterLvTextStroke.text = _oCounterLvText.text;
    };

    this._onPause = function () {
        s_oGame.unpause(false);
        this.createPauseInterface();
        createjs.Ticker.paused = true;
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

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;