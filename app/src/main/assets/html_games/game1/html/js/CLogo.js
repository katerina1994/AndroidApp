function CLogo(iXPos, iYPos) {
    var _oLogo;

    this._init = function (iXPos, iYPos) {

        var oSprite = s_oSpriteLibrary.getSprite("logo");

        _oLogo = createBitmap(oSprite);

        _oLogo.regX = (oSprite.width * 0.5);
        _oLogo.regY = (oSprite.height * 0.5);

        _oLogo.x = iXPos;
        _oLogo.y = iYPos;

        s_oStage.addChild(_oLogo);

    };

    this.playAnimation = function () {
        createjs.Tween.get(_oLogo).to({y: LOGO_Y_POS}, 1000, createjs.Ease.bounceOut);
    };

    this.unload = function () {
        s_oScrollStage.removeChild(_oLogo);
        _oLogo = null;
    };

    this._init(iXPos, iYPos);

    return this;
}