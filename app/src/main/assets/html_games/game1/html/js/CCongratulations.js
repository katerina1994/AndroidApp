function CCongratulations(oSpriteBg, iScore, iPercent, iLvScore, iPrecScore) {

    var _oGroup;
    var _oGroupMsgBox;
    var _oBg;
    var _oFade;
    var _oButMenu;
    var _oRollingTextScore;
    var _oRollingTextStars;
    var _iWidth;
    var _aStar;

    this._init = function (oSpriteBg, iScore, iPercent, iLvScore, iPrecScore) {
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

        var iSizeFontCongratulations = 42;
        var iSizeFontGameCompleted = 30;
        var iSizeFont = 26;

        var oTextCongratulations;
        var oTextCongratulationsStroke;
        var oTextGameCompleted;
        var oTextGameCompletedStroke;
        var oTextScore;
        var oTextScoreStruct;

        oTextCongratulationsStroke = new createjs.Text(TEXT_CONGRATULATIONS, iSizeFontCongratulations + "px " + FONT_GAME, "#000000");
        oTextCongratulationsStroke.textAlign = "center";
        oTextCongratulationsStroke.textBaseline = "middle";
        oTextCongratulationsStroke.x = CANVAS_WIDTH * 0.5;
        oTextCongratulationsStroke.y = 166;
        oTextCongratulationsStroke.outline = 4;

        _oGroupMsgBox.addChild(oTextCongratulationsStroke);

        oTextCongratulations = new createjs.Text(TEXT_CONGRATULATIONS, iSizeFontCongratulations + "px " + FONT_GAME, "#ffdc00");
        oTextCongratulations.textAlign = "center";
        oTextCongratulations.textBaseline = "middle";
        oTextCongratulations.x = CANVAS_WIDTH * 0.5;
        oTextCongratulations.y = oTextCongratulationsStroke.y;

        _oGroupMsgBox.addChild(oTextCongratulations);

        oTextGameCompletedStroke = new createjs.Text(TEXT_GAME_COMPLETED, iSizeFontGameCompleted + "px " + FONT_GAME, "#000000");
        oTextGameCompletedStroke.textAlign = "center";
        oTextGameCompletedStroke.textBaseline = "middle";
        oTextGameCompletedStroke.x = 685;
        oTextGameCompletedStroke.y = 236;
        oTextGameCompletedStroke.outline = 4;

        _oGroupMsgBox.addChild(oTextGameCompletedStroke);

        oTextGameCompleted = new createjs.Text(TEXT_GAME_COMPLETED, iSizeFontGameCompleted + "px " + FONT_GAME, "#ffdc00");
        oTextGameCompleted.textAlign = "center";
        oTextGameCompleted.textBaseline = "middle";
        oTextGameCompleted.x = oTextGameCompletedStroke.x;
        oTextGameCompleted.y = oTextGameCompletedStroke.y;

        _oGroupMsgBox.addChild(oTextGameCompleted);

        oTextScoreStruct = new createjs.Text(TEXT_SCORE + ":", iSizeFont + "px " + FONT_GAME, "#000000");
        oTextScoreStruct.textAlign = "center";
        oTextScoreStruct.textBaseline = "middle";
        oTextScoreStruct.x = 640;
        oTextScoreStruct.y = 350;
        oTextScoreStruct.outline = 4;

        _oGroupMsgBox.addChild(oTextScoreStruct);

        oTextScore = new createjs.Text(TEXT_SCORE + ":", iSizeFont + "px " + FONT_GAME, "#ffdc00");
        oTextScore.textAlign = "center";
        oTextScore.textBaseline = "middle";
        oTextScore.x = oTextScoreStruct.x;
        oTextScore.y = oTextScoreStruct.y;

        _oGroupMsgBox.addChild(oTextScore);

        var oScoreStruct;

        oScoreStruct = new createjs.Text(iPrecScore, iSizeFont + "px " + FONT_GAME, "#000000");
        oScoreStruct.textAlign = "left";
        oScoreStruct.textBaseline = "middle";
        oScoreStruct.x = oTextScoreStruct.x + 50;
        oScoreStruct.y = oTextScoreStruct.y;
        oScoreStruct.outline = 4;

        _oGroupMsgBox.addChild(oScoreStruct);

        var oScore;

        oScore = new createjs.Text(iPrecScore, iSizeFont + "px " + FONT_GAME, "#ffdc00");
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
            var iXPos = STARS_POSITION[i].x - 75;
            var iYPos = STARS_POSITION[i].y + 75;
            _aStar[i] = new CStar(iXPos, iYPos, oSpriteStar, false, _oGroupMsgBox);
        }

        _oGroup.addChild(_oGroupMsgBox);

        _oGroup.x = 0;
        _oGroup.y = 0;

        s_oStage.addChild(_oGroup);

        var oSpriteHome = s_oSpriteLibrary.getSprite("but_home");

        _oButMenu = new CGfxButton(882, 350, oSpriteHome, _oGroupMsgBox);
        _oButMenu.addEventListener(ON_MOUSE_UP, this._onExit, this);

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
        var oParent = this;
        createjs.Tween.get(_oGroupMsgBox).to({y: CANVAS_HEIGHT + _iWidth}, 1500, createjs.Ease.cubicIn).call(function () {
            oParent.unloadButton();
        });

        _oRollingTextScore.unload();
        _oRollingTextStars.unload();
    };

    this.unloadButton = function () {
        _oButMenu.unload();
        _oButMenu = null;
    };

    this.blockAllBut = function () {
        _oButMenu.block(true);
    };

    this._onExit = function () {
        this.blockAllBut();

        var oFadeEnd = new createjs.Shape();
        oFadeEnd.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFadeEnd.alpha = 0;

        _oGroup.addChild(oFadeEnd);

        s_oGame.decreaseVolumeSoundLevelComplete(true);

        var oParent = this;
        createjs.Tween.get(oFadeEnd).to({alpha: 1}, 2500, createjs.Ease.cubicIn).call(function () {
            s_oGame.onExit();
            oParent.unload();
        });

    };

    this._onRollingTextScore = function () {

    };

    this._onRollingText = function (iStep) {
        _aStar[iStep].setActive(true);
        _aStar[iStep].pulseAnimation(500, SCALE_STAR_FACTOR);
        playSound("star", 1, 0);
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

    this._init(oSpriteBg, iScore, iPercent, iLvScore, iPrecScore);

    return this;
}