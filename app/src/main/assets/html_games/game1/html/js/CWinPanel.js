function CWinPanel(oSpriteBg, iScore, iPercent, iLvScore, iPrecScore, iLv) {

    var _oGroup;
    var _oGroupMsgBox;
    var _oBg;
    var _oFade;
    var _oButMenu;
    var _oButRestart;
    var _oButNext;
    var _oRollingTextScore;
    var _oRollingTextStars;
    var _iWidth;
    var _aStar;

    this._init = function (oSpriteBg, iScore, iPercent, iLvScore, iPrecScore, iLv) {
        _aStar = new Array();

        _oGroup = new createjs.Container();

        _oGroupMsgBox = new createjs.Container();
        _iWidth = oSpriteBg.width;

        _oGroupMsgBox.y = -_iWidth;

        _oBg = createBitmap(oSpriteBg);

        _oBg.x = CANVAS_WIDTH * 0.5;
        _oBg.y = CANVAS_HEIGHT * 0.5;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oGroupMsgBox.addChild(_oBg);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;

        _oFade.on("click", function () {});

        _oGroup.addChild(_oFade);

        var iSizeFont = 32;
        var iSizeFontLV = 40;

        var oTextLevelCompleted;
        var oTextLevelCompletedStruct;
        var oTextScore;
        var oTextScoreStruct;

        oTextLevelCompletedStruct = new createjs.Text(TEXT_LEVEL_COMPLETED, iSizeFontLV + "px " + FONT_GAME, "#000000");
        oTextLevelCompletedStruct.textAlign = "center";
        oTextLevelCompletedStruct.textBaseline = "middle";
        oTextLevelCompletedStruct.x = CANVAS_WIDTH * 0.5 + 65;
        oTextLevelCompletedStruct.y = 166;
        oTextLevelCompletedStruct.outline = 4;

        _oGroupMsgBox.addChild(oTextLevelCompletedStruct);

        oTextLevelCompleted = new createjs.Text(TEXT_LEVEL_COMPLETED, iSizeFontLV + "px " + FONT_GAME, TEXT_COLOR);
        oTextLevelCompleted.textAlign = "center";
        oTextLevelCompleted.textBaseline = "middle";
        oTextLevelCompleted.x = oTextLevelCompletedStruct.x;
        oTextLevelCompleted.y = oTextLevelCompletedStruct.y;

        _oGroupMsgBox.addChild(oTextLevelCompleted);

        oTextScoreStruct = new createjs.Text(TEXT_SCORE + ":", iSizeFont + "px " + FONT_GAME, "#000000");
        oTextScoreStruct.textAlign = "center";
        oTextScoreStruct.textBaseline = "middle";
        oTextScoreStruct.x = 717;
        oTextScoreStruct.y = 270;
        oTextScoreStruct.outline = 4;

        _oGroupMsgBox.addChild(oTextScoreStruct);

        oTextScore = new createjs.Text(TEXT_SCORE + ":", iSizeFont + "px " + FONT_GAME, TEXT_COLOR);
        oTextScore.textAlign = "center";
        oTextScore.textBaseline = "middle";
        oTextScore.x = oTextScoreStruct.x;
        oTextScore.y = oTextScoreStruct.y;

        _oGroupMsgBox.addChild(oTextScore);

        var oScoreStruct;

        oScoreStruct = new createjs.Text(iPrecScore, iSizeFont + "px " + FONT_GAME, "#000000");
        oScoreStruct.textAlign = "left";
        oScoreStruct.textBaseline = "middle";
        oScoreStruct.x = oTextScoreStruct.x + 54;
        oScoreStruct.y = 270;
        oScoreStruct.outline = 4;

        _oGroupMsgBox.addChild(oScoreStruct);

        var oScore;

        oScore = new createjs.Text(iPrecScore, iSizeFont + "px " + FONT_GAME, TEXT_COLOR);
        oScore.textAlign = "left";
        oScore.textBaseline = "middle";
        oScore.x = oScoreStruct.x;
        oScore.y = oScoreStruct.y;

        _oGroupMsgBox.addChild(oScore);

        var oPercentTextStoke;

        oPercentTextStoke = new createjs.Text("0", iSizeFont + "px " + FONT_GAME, "#000000");
        oPercentTextStoke.textAlign = "center";
        oPercentTextStoke.textBaseline = "middle";
        oPercentTextStoke.x = 840;
        oPercentTextStoke.y = 242;
        oPercentTextStoke.outline = 4;

        var oPercentText;

        oPercentText = new createjs.Text("0", iSizeFont + "px " + FONT_GAME, "#000000");
        oPercentText.textAlign = "center";
        oPercentText.textBaseline = "middle";
        oPercentText.x = 840;
        oPercentText.y = 242;

        var oSpriteStar = s_oSpriteLibrary.getSprite("star");

        for (var i = 0; i < NUMBER_OF_STARS; i++) {
            var iXPos = STARS_POSITION[i].x;
            var iYPos = STARS_POSITION[i].y;
            _aStar[i] = new CStar(iXPos, iYPos, oSpriteStar, false, _oGroupMsgBox);
        }

        _oGroup.addChild(_oGroupMsgBox);

        _oGroup.x = 0;
        _oGroup.y = 0;

        s_oStage.addChild(_oGroup);

        var oSpriteRestart = s_oSpriteLibrary.getSprite("but_restart_big");
        var oSpriteHome = s_oSpriteLibrary.getSprite("but_home");
        var oSpriteNext = s_oSpriteLibrary.getSprite("but_continue");

        _oButMenu = new CGfxButton(635, 350, oSpriteHome, _oGroupMsgBox);
        _oButMenu.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _oButRestart = new CGfxButton(759, 350, oSpriteRestart, _oGroupMsgBox);
        _oButRestart.addEventListenerWithParams(ON_MOUSE_UP, this._onRestart, this, iLv);

        _oButNext = new CGfxButton(882, 350, oSpriteNext, _oGroupMsgBox);
        _oButNext.addEventListener(ON_MOUSE_UP, this._onContinue, this);
        _oButNext.pulseAnimation();

        createjs.Tween.get(_oFade).to({alpha: 0.5}, 750, createjs.Ease.cubicOut);

        var oParent = this;

        createjs.Tween.get(_oGroupMsgBox).to({y: 0}, 1500, createjs.Ease.bounceOut).call(function () {
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
            oParent.checkPoint(oScore, oScoreStruct, iLvScore, oParent);
            oParent.checkStars(oPercentText, oPercentTextStoke, iPercent, oParent);
        });

        $(s_oMain).trigger("save_score", iScore);
        $(s_oMain).trigger("share_event", iScore);
    };

    this.unload = function () {
        this.blockAllBut();
        var oParent = this;
        createjs.Tween.get(_oGroupMsgBox).to({y: CANVAS_HEIGHT + _iWidth}, 1000, createjs.Ease.cubicIn).call(function () {
            oParent.unloadButton();
        });

        _oRollingTextScore.unload();
        _oRollingTextStars.unload();

    };

    this.blockAllBut = function () {
        _oButRestart.block(true);
        _oButMenu.block(true);
        _oButNext.block(true);
    };

    this.unloadButton = function () {
        _oButMenu.unload();
        _oButMenu = null;
        _oButRestart.unload();
        _oButRestart = null;
        _oButNext.unload();
        _oButNext = null;
    };

    this._onRestart = function (iLv) {
        this.unload();
        createjs.Tween.get(_oFade).to({alpha: 1}, 1000, createjs.Ease.cubicIn).call(function () {
            s_oGame.restartLevel();
            s_oGame.changeState(GAME_STATE_PLAY);
            s_oStage.removeChild(_oGroup);
        });
        $(s_oMain).trigger("restart_level", iLv);
    };

    this.checkStars = function (oPercentText, oPercentTextStoke, iPercent, oParent) {
        _oRollingTextStars = new CRollingTextController(oPercentText, oPercentTextStoke, iPercent, 4000, EASE_CUBIC_OUT);
        _oRollingTextStars.addEventListener(ON_CONTROLLER_END, oParent._onFinishRollingStars);
        _oRollingTextStars.addEventListener(ON_CONTROLLER_REMOVE, oParent._onFinishRollingStars);
        _oRollingTextStars.addRollingListener(oParent._onRollingText, oParent, PERCENTAGE_STARS);
    };

    this.checkPoint = function (oScore, oScoreStroke, iScore, oParent) {
        _oRollingTextScore = new CRollingTextController(oScore, oScoreStroke, iScore, 4000, EASE_CUBIC_OUT);
        _oRollingTextScore.addEventListener(ON_CONTROLLER_END, oParent._onFinishRollingPoint);
        _oRollingTextScore.addEventListener(ON_CONTROLLER_REMOVE, oParent._onFinishRollingPoint);
        _oRollingTextScore.addRollingListener(oParent._onRollingTextScore, oParent, PERCENTAGE_STARS);
    };

    this._onFinishRollingPoint = function () {
        _oRollingTextScore.unload();
    };

    this._onFinishRollingStars = function () {
        _oRollingTextStars.unload();
    };

    this._onContinue = function () {
        this.unload();
        s_oGame.decreaseVolumeSoundLevelComplete(true);
        createjs.Tween.get(_oFade).to({alpha: 1}, 750, createjs.Ease.cubicIn).call(function () {
            s_oGame.nextLevel();
            s_oGame.changeState(GAME_STATE_PLAY);
            
             s_oStage.removeChild(_oGroup);
                s_oGame.decreaseVolumeSoundLevelComplete(false);
        });
    };

    this._onRollingTextScore = function () {

    };

    this._onRollingText = function (iStep) {
        _aStar[iStep].setActive(true);
        _aStar[iStep].pulseAnimation(500, SCALE_STAR_FACTOR);
        playSound("star", 1, 0);
    };

    this._onExit = function () {
        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, iScore, iPercent, iLvScore, iPrecScore, iLv);

    return this;
}