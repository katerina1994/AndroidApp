function CCreditsPanel() {

    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    var _oMsgTextOutline;

    var _oHitArea;

    var _oLink;
    var _oLinkOutline;

    var _pStartPosExit;

    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;

        _oContainer.addChild(oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(_oBg);
        _oBg.x = CANVAS_WIDTH * 0.5;
        _oBg.y = CANVAS_HEIGHT * 0.5;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oHitArea.on("click", this._onLogoButRelease);
        if (!s_bMobile) {
            _oHitArea.cursor = "pointer";
        }
        _oContainer.addChild(_oHitArea);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: 900, y: 170};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);

        _oMsgTextOutline = new createjs.Text(TEXT_CREDITS_DEVELOPED, "28px " + FONT_GAME, "#000");
        _oMsgTextOutline.textAlign = "center";
        _oMsgTextOutline.textBaseline = "alphabetic";
        _oMsgTextOutline.x = CANVAS_WIDTH / 2 + 25;
        _oMsgTextOutline.y = 180;
        _oMsgTextOutline.outline = 3;
        _oContainer.addChild(_oMsgTextOutline);

        _oMsgText = new createjs.Text(TEXT_CREDITS_DEVELOPED, "28px " + FONT_GAME, TEXT_COLOR);
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.x = CANVAS_WIDTH / 2 + 25;
        _oMsgText.y = _oMsgTextOutline.y;
        _oContainer.addChild(_oMsgText);

        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width / 2;
        _oButLogo.regY = oSprite.height / 2;
        _oButLogo.x = CANVAS_WIDTH / 2 + 25;
        _oButLogo.y = 260;
        _oContainer.addChild(_oButLogo);

        _oLinkOutline = new createjs.Text(TEXT_LINK1, "32px " + FONT_GAME, "#000");
        _oLinkOutline.textAlign = "center";
        _oLinkOutline.textBaseline = "alphabetic";
        _oLinkOutline.x = CANVAS_WIDTH / 2 + 25;
        _oLinkOutline.y = 360;
        _oLinkOutline.outline = 3;
        _oContainer.addChild(_oLinkOutline);

        _oLink = new createjs.Text(TEXT_LINK1, "32px " + FONT_GAME, TEXT_COLOR);
        _oLink.textAlign = "center";
        _oLink.textBaseline = "alphabetic";
        _oLink.x = CANVAS_WIDTH / 2 + 25;
        _oLink.y = _oLinkOutline.y;
        _oContainer.addChild(_oLink);


        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {

    };

    this.unload = function () {
        playSound("click", 1, 0);
        _oHitArea.off("click", this._onLogoButRelease);

        _oButExit.unload();
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };

    this._onLogoButRelease = function () {
        playSound("click", 1, 0);
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank");
    };

    this._init();


}



