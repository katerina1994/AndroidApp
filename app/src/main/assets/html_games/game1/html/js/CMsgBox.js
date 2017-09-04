function CMsgBox(szText,oParentContainer){
    var _oMsgStroke;
    var _oMsg;
    var _oButOk;
    var _oThis;
    var _oContainer;
    var _oParentContainer;

    this._init = function (szText) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oFade;

        oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;

        oFade.on("click", function () {});

        _oContainer.addChild(oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);

        oBg.x = CANVAS_WIDTH * 0.5;
        oBg.y = CANVAS_HEIGHT * 0.5;
        oBg.regX = oSpriteBg.width * 0.5;
        oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(oBg);

        _oMsgStroke = new createjs.Text(szText, "24px " + FONT_GAME, "#000");
        _oMsgStroke.x = CANVAS_WIDTH / 2 + 25;
        _oMsgStroke.y = 160;
        _oMsgStroke.textAlign = "center";
        _oMsgStroke.textBaseline = "middle";
        _oMsgStroke.lineWidth = 500;
        _oMsgStroke.outline = 2;
        _oContainer.addChild(_oMsgStroke);

        _oMsg = new createjs.Text(_oMsgStroke.text, "24px " + FONT_GAME, TEXT_COLOR);
        _oMsg.x = _oMsgStroke.x;
        _oMsg.y = _oMsgStroke.y;
        _oMsg.textAlign = "center";
        _oMsg.textBaseline = "middle";
        _oMsg.lineWidth = 500;
        _oContainer.addChild(_oMsg);

        _oButOk = new CGfxButton(CANVAS_WIDTH / 2, 350, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButOk.addEventListener(ON_MOUSE_UP, this._onButOk, this);
    };

    this._onButOk = function () {
        _oThis.unload();
    };

    this.unload = function () {
        _oButOk.unload();
        _oParentContainer.removeChild(_oContainer);
    };
    
    _oThis = this;
    _oParentContainer = oParentContainer;

    this._init(szText);
}