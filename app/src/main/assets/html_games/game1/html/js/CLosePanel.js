function CLosePanel(oSpriteBg, iScore) {

    var _oGroup;
    var _oGroupMsgBox;
    var _oBg;
    var _oFade;
    var _oButMenu;
    var _oButRestart;
    var _iWidth;

    this._init = function (oSpriteBg, iScore) {

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

        var iSizeFont = 34;

        var oTextGameOver;
        var oTextGameOverStruct;
        var oTextTitle;
        var oTextTitleStruct;

        oTextTitleStruct = new createjs.Text(TEXT_GAMEOVER, iSizeFont + 10 + "px " + FONT_GAME, "#000000");
        oTextTitleStruct.textAlign = "center";
        oTextTitleStruct.textBaseline = "middle";
        oTextTitleStruct.x = CANVAS_WIDTH * 0.5;
        oTextTitleStruct.y = 176;
        oTextTitleStruct.outline = 4;

        _oGroupMsgBox.addChild(oTextTitleStruct);

        oTextTitle = new createjs.Text(TEXT_GAMEOVER, iSizeFont + 10 + "px " + FONT_GAME, TEXT_COLOR);
        oTextTitle.textAlign = "center";
        oTextTitle.textBaseline = "middle";
        oTextTitle.x = CANVAS_WIDTH * 0.5;
        oTextTitle.y = oTextTitleStruct.y;

        _oGroupMsgBox.addChild(oTextTitle);

        oTextGameOverStruct = new createjs.Text(TEXT_SCORE + ": " + iScore, iSizeFont + "px " + FONT_GAME, "#000000");
        oTextGameOverStruct.textAlign = "center";
        oTextGameOverStruct.textBaseline = "middle";
        oTextGameOverStruct.x = CANVAS_WIDTH * 0.5;
        oTextGameOverStruct.y = 241;
        oTextGameOverStruct.outline = 4;

        _oGroupMsgBox.addChild(oTextGameOverStruct);

        oTextGameOver = new createjs.Text(TEXT_SCORE + ": " + iScore, iSizeFont + "px " + FONT_GAME, TEXT_COLOR);
        oTextGameOver.textAlign = "center";
        oTextGameOver.textBaseline = "middle";
        oTextGameOver.x = CANVAS_WIDTH * 0.5;
        oTextGameOver.y = oTextGameOverStruct.y;

        _oGroupMsgBox.addChild(oTextGameOver);

        _oGroup.addChild(_oGroupMsgBox);

        _oGroup.x = 0;
        _oGroup.y = 0;

        s_oStage.addChild(_oGroup);

        var oSpriteRestart = s_oSpriteLibrary.getSprite("but_restart_big");
        var oSpriteHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(510, 350, oSpriteHome, _oGroupMsgBox);
        _oButMenu.addEventListener(ON_MOUSE_UP, this._onExit, this);
        _oButRestart = new CGfxButton(850, 350, oSpriteRestart, _oGroupMsgBox);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        _oButRestart.pulseAnimation();

        createjs.Tween.get(_oFade).to({alpha: 0.5}, 750, createjs.Ease.cubicOut);

        createjs.Tween.get(_oGroupMsgBox).to({y: 0}, 1500, createjs.Ease.bounceOut).call(function () {
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
        });

        $(s_oMain).trigger("save_score", iScore);
        $(s_oMain).trigger("share_event", iScore);
    };

    this.unload = function () {
        var oParent = this;
        createjs.Tween.get(_oGroupMsgBox).to({y: CANVAS_HEIGHT + _iWidth}, 1500, createjs.Ease.cubicIn).call(function () {
            oParent.unloadButton();
        });

    };

    this.unloadButton = function () {
        _oButMenu.unload();
        _oButMenu = null;
        _oButRestart.unload();
        _oButRestart = null;
    };

    this.blockAllBut = function () {
        _oButRestart.block(true);
        _oButMenu.block(true);
    };

    this._onRestart = function () {
        this.blockAllBut();
        this.unload();
        createjs.Tween.get(_oFade).to({alpha: 1}, 1000, createjs.Ease.cubicIn).call(function () {
            s_oGame.restartLevel();
            s_oGame.changeState(GAME_STATE_PLAY);
            s_oStage.removeChild(_oGroup);
        });

    };

    this._onExit = function () {
        this.unload();
        this.blockAllBut();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, iScore);

    return this;
}