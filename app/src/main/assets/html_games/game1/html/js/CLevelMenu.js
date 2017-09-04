function CLevelMenu(oData) {

    var _bNumActive;

    var _oLevelTextContainer;
    var _aLevels = new Array();
    var _oModeNumOff;
    var _oModeNumOn;

    var _oBg;
    var _oButExit;
    var _oAudioToggle;

    var _oFade;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButFullscreen;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oBg.x = 0;
        _oBg.y = 0;
        s_oStage.addChild(_oBg);

        _bNumActive = false;

        var oSpritePanel = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpritePanel);
        _oBg.x = CANVAS_WIDTH * 0.5;
        _oBg.y = CANVAS_HEIGHT * 0.5;
        _oBg.regX = oSpritePanel.width * 0.5;
        _oBg.regY = oSpritePanel.height * 0.5;

        s_oStage.addChild(_oBg);

        _oLevelTextContainer = new createjs.Container();
        _oLevelTextContainer.x = 0;
        _oLevelTextContainer.y = 0;

        var iY = 176;
        var oLevelText;

        oLevelText = new createjs.Text(TEXT_SELECT_A_LEVEL, " 40px " + FONT_GAME, TEXT_COLOR);
        oLevelText.x = CANVAS_WIDTH / 2 + 25;
        oLevelText.y = iY;
        oLevelText.textAlign = "center";
        oLevelText.textBaseline = "alphabetic";
        oLevelText.lineWidth = 1000;

        var oLevelTextStruct;

        oLevelTextStruct = new createjs.Text(TEXT_SELECT_A_LEVEL, " 40px " + FONT_GAME, "#000000");
        oLevelTextStruct.x = oLevelText.x;
        oLevelTextStruct.y = iY;
        oLevelTextStruct.textAlign = "center";
        oLevelTextStruct.textBaseline = "alphabetic";
        oLevelTextStruct.lineWidth = 1000;
        oLevelTextStruct.outline = 3;

        _oLevelTextContainer.addChild(oLevelTextStruct, oLevelText);

        s_oStage.addChild(_oLevelTextContainer);

        var oModePos = {x: 535, y: 240};

        var offset_x = 0;
        var offset_y = 0;

        for (var i = 0; i < s_aLevelDiagram.length; i++, offset_x += 85) {
            if (offset_x > 350) {
                offset_x = 0;
                offset_y += 100;
            }

            var iXPos = (oModePos.x) + offset_x;
            var iYPos = oModePos.y + offset_y;

            if (i < s_iLevelReached) {
                _aLevels[i] = new CLevelBut(iXPos, iYPos, s_oSpriteLibrary.getSprite('but_level'), true, i + 1, s_oStage);
                _aLevels[i].addEventListenerWithParams(ON_MOUSE_DOWN, this._onClick, this, i);
                this.addStars(iXPos, iYPos, i);
            } else {
                _aLevels[i] = new CLevelBut((oModePos.x) + offset_x, oModePos.y + offset_y, s_oSpriteLibrary.getSprite('but_level'), false, i + 1, s_oStage);
            }

            s_bFirstTime = true;
        }

        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSpriteExit.width / 2) - 10, y: (oSpriteExit.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width / 2) - (oSpriteExit.width / 2) - 18, y: (oSprite.height / 2) + 10};
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
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.addStars = function (iX, iY, iLv) {
        var aStar = new Array();
        var iPerc = s_aPercentage[iLv];

        var iOffsetX = 26;
        var iOffsetY = 34;

        var iXPos = iX - iOffsetX;
        var iYPos = iY - iOffsetY;

        var oSprite = s_oSpriteLibrary.getSprite("star");
        for (var i = 0; i < NUMBER_OF_STARS; i++) {
            var bActive = false;
            if (iPerc > PERCENTAGE_STARS[i]) {
                bActive = true;
            }
            aStar[i] = new CStar(iXPos, iYPos, oSprite, bActive, s_oStage);
            aStar[i].setScale(0.5);
            iXPos += iOffsetX;
        }
    };

    this.unload = function () {
        for (var i = 0; i < s_aLevelDiagram.length; i++) {
            _aLevels[i].unload();
        }
        
        _oButExit.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        s_oLevelMenu = null;
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
    };

    this._onNumModeToggle = function (iData) {
        if (iData === NUM_ACTIVE) {
            _bNumActive = true;
            _oModeNumOff.setActive(false);
            _oModeNumOn.setActive(true);

        } else {
            _bNumActive = false;
            _oModeNumOff.setActive(true);
            _oModeNumOn.setActive(false);
        }
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

    this._onClick = function (i) {
        var level = i;
        var clickable = _aLevels[i].ifClickable();
        if (clickable) {
            s_oLevelMenu.unload();
            s_oMain.gotoGame(level);
        }
    };

    this._onExit = function () {
        playSound("click", 1, 0);
        s_oLevelMenu.unload();
        s_oMain.gotoMenu();
    };

    PERCENTAGE_STARS = oData.percentage_stars;

    s_oLevelMenu = this;
    this._init();

}


var s_oLevelMenu = null;