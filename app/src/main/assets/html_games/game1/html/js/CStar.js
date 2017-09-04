function CStar(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _oStar;
    var _fScaleX = 1;
    var _fScaleY = 1;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, bActive) {

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {state_true: [0], state_false: [1]}
        };


        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;

        _oStar = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

        _oStar.x = iXPos;
        _oStar.y = iYPos;
        _oStar.stop();

        _oParentContainer.addChild(_oStar);

    };

    this.unload = function () {
        _oParentContainer.removeChild(_oStar);
    };

    this.setActive = function (bActive) {
        _bActive = bActive;
        _oStar.gotoAndStop("state_" + _bActive);
    };

    this.setPosition = function (iX, iY) {
        _oStar.x = iX;
        _oStar.y = iY;
    };

    this.setScale = function (fValue) {
        _fScaleX = fValue;
        _fScaleY = fValue;
        _oStar.scaleX = fValue;
        _oStar.scaleY = fValue;
    };

    this.pulseAnimation = function (iTime,fScaleFactor) {
        createjs.Tween.get(_oStar).to({scaleX: _fScaleX * fScaleFactor, scaleY: _fScaleY * fScaleFactor}, iTime + 200, createjs.Ease.quadOut).to({scaleX: _fScaleX, scaleY: _fScaleY}, iTime, createjs.Ease.quadIn);
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite, bActive);
}