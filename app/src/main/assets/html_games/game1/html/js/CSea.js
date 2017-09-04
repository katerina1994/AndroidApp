function CSea(iXPos, iYPos, oParentContainer) {
    var _oParentContainer;
    var _oContainer;
    var _aSea;
    var _iWidth;
    var _fSpeed = 0;

    this._init = function (iXPos, iYPos, oParentContainer) {

        _aSea = new Array();

        _oParentContainer = oParentContainer;

        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        var oSprite = s_oSpriteLibrary.getSprite("sea");

        _iWidth = oSprite.width;
        var iX = 0;
        var iY = POSITION_Y_SEA;

        for (var i = 0; i < SEA_NUMBER; i++) {
            _aSea[i] = this.addSea(iX, iY, oSprite);
            iX += _iWidth;
        }

        _oParentContainer.addChild(_oContainer);

    };

    this.addSea = function (iXPos, iYPos, oSprite) {
        var oSea = createBitmap(oSprite);

        oSea.x = iXPos;
        oSea.y = iYPos;

        oSea.regX = _iWidth;

        _oContainer.addChild(oSea);

        return oSea;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
        _oContainer = null;
    };

    this.setSpeed = function (fValue) {
        _fSpeed = fValue;
    };

    this.update = function () {
        for (var i = 0; i < _aSea.length; i++) {

            if (_aSea[i].x < 0) {
                if (i === 0) {
                    _aSea[i].x = _aSea[_aSea.length - 1].x + _iWidth;
                } else {
                    _aSea[i].x = _aSea[i - 1].x + _iWidth;
                }
            }
            
            _aSea[i].x += _fSpeed;
        }
    };

    this._init(iXPos, iYPos, oParentContainer);

    return this;
}
