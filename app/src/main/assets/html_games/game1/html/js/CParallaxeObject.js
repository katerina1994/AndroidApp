function CParallaxeObject(iXPos, iYPos, szMaterial, iType, oParentContainer) {
    var _oObj;
    var _oParentContainer;
    var _fScale = 1;

    this._init = function (iXPos, iYPos, szMaterial, iType, oParentContainer) {

        var oSprite = s_oSpriteLibrary.getSprite("parallaxe_" + szMaterial + "_" + iType);

        _oParentContainer = oParentContainer;

        _oObj = createBitmap(oSprite);

        _oObj.regX = (oSprite.width * 0.5);
        _oObj.regY = oSprite.height;

        _oObj.x = iXPos;
        _oObj.y = iYPos;

        _oParentContainer.addChild(_oObj);

    };

    this.flip = function (bVal) {
        if (bVal) {
            _oObj.scaleX = -_fScale;
        } else {
            _oObj.scaleX = _fScale;
        }
    };

    this.scale = function (fVal) {
        _fScale = fVal;
        _oObj.scaleX = _fScale;
        _oObj.scaleY = _fScale;
    };

    this.setPosition = function (iX, iY) {
        _oObj.x = iX;
        _oObj.y = iY;
    };

    this.getX = function () {
        return _oObj.x;
    };

    this.getY = function () {
        return _oObj.y;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oObj);
        _oObj = null;
    };

    this._init(iXPos, iYPos, szMaterial, iType, oParentContainer);

    return this;
}