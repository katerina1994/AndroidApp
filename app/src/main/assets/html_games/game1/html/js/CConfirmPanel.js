function CConfirmPanel(szText) {

    var _iTextY = -100;
    var _iButtonY = 75;

    var _oParent = this;

    var _aCbCompleted = new Array();
    var _aCbOwner = new Array();
    var _aParams = new Array();

    var _oBg;
    var _oContainer;
    var _oContainerPos = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2};

    var _szText = szText;
    var _oMsgText;
    var _oMsgTextStroke;

    var _oShape;

    var _oButNo;
    var _oButYes;

    this._init = function () {
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oContainer = new createjs.Container();
        _oContainer.x = _oContainerPos.x;
        _oContainer.y = -oSpriteBg.height;

        _oShape = new createjs.Shape();
        _oShape.graphics.beginFill("#000000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oShape.alpha = 0.0;
        _oShape.on("mousedown", this._onClick);
        s_oStage.addChild(_oShape);

        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width / 2;
        _oBg.regY = oSpriteBg.height / 2;
        _oContainer.addChild(_oBg);

        _oMsgTextStroke = new createjs.Text(_szText, " 30px " + FONT_GAME, "#000");
        _oMsgTextStroke.x = 0;
        _oMsgTextStroke.y = _iTextY + 10;
        _oMsgTextStroke.textAlign = "center";
        _oMsgTextStroke.textBaseline = "alphabetic";
        _oMsgTextStroke.lineWidth = 400;
        _oMsgTextStroke.outline = 3;
        _oContainer.addChild(_oMsgTextStroke);

        _oMsgText = new createjs.Text(_szText, " 30px " + FONT_GAME, TEXT_COLOR);
        _oMsgText.x = 0;
        _oMsgText.y = _iTextY + 10;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 400;
        _oContainer.addChild(_oMsgText);

        _oButNo = new CGfxButton(-100, _iButtonY, s_oSpriteLibrary.getSprite('but_exit_big'), _oContainer);
        _oButNo.pulseAnimation();

        _oButYes = new CGfxButton(100, _iButtonY, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);

        s_oStage.addChild(_oContainer);

        this.show();
    };

    this._initListener = function () {
        _oButNo.addEventListener(ON_MOUSE_DOWN, this.buttonNoDown, this);
        _oButYes.addEventListener(ON_MOUSE_DOWN, this.buttonYesDown, this);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonNoDown = function () {

        if (_aCbCompleted[ON_BUT_NO_DOWN]) {
            _aCbCompleted[ON_BUT_NO_DOWN].call(_aCbOwner[ON_BUT_NO_DOWN], _aParams);
        }
    };

    this.buttonYesDown = function () {

        if (_aCbCompleted[ON_BUT_YES_DOWN]) {
            _aCbCompleted[ON_BUT_YES_DOWN].call(_aCbOwner[ON_BUT_YES_DOWN], _aParams);
        }
    };

    this._onClick = function () {

    };

    this.show = function () {
        createjs.Tween.get(_oShape).to({alpha: 0.7}, 500);
        
        createjs.Tween.get(_oContainer).to({y: _oContainerPos.y}, 500, createjs.Ease.quadOut).call(function () {
            _oParent._initListener();
        });
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT * 1.5}, 500).call(function () {
            s_oStage.removeChild(_oContainer);
        });

        createjs.Tween.get(_oShape).to({alpha: 0}, 500).call(function () {
            s_oStage.removeChild(_oShape);
        });

    };

    this._init();

    s_oVariousHelp = this;

    return this;
}

var s_oVariousHelp = null;