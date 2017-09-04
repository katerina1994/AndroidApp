function CParallaxObject(iXPos, iYPos, oParentContainer) {
    var _oParentContainer;
    var _oContainer;
    var _aObject;
    var _fSpeed = 0;

    this._init = function (iXPos, iYPos, oParentContainer) {

        _aObject = new Array();

        _oParentContainer = oParentContainer;

        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        _oParentContainer.addChild(_oContainer);
        _oParentContainer.setChildIndex(_oContainer, 1);

    };

    this.addObject = function (iXPos, iYPos, szMaterial, iType) {
        var iID = _aObject.length;
        _aObject.push(new CParallaxeObject(iXPos, iYPos, szMaterial, iType, _oContainer));

        this.randomObjectScale(_aObject[iID]);
        this.randomFlipObject(_aObject[iID]);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
        _oContainer = null;
    };

    this.unloadObject = function () {
        for (var i = 0; i < _aObject.length; i++) {
            _oContainer.removeChild(_aObject[i]);
        }
    };

    this.randomObjectScale = function (oObject) {
        var fScale = Math.random() * -MIN_SCALE_PARALLAXE + MAX_SCALE_PARALLAXE;
        oObject.scale(fScale);
    };

    this.randomFlipObject = function (oObject) {
        var iRand = Math.round(Math.random() * 1);
        if (iRand === 1) {
            oObject.flip(true);
        } else {
            oObject.flip(false);
        }
    };

    this.randomPosition = function (oObject) {
        var iNewX = Math.random() * MAX_POS_X_RANDOM_PARALLAXE + PARALLAXE_OBJ_X_REPOS;
        oObject.setPosition(iNewX, oObject.getY());
    };

    this.randomizeObject = function (oObject) {
        this.randomPosition(oObject);

        this.randomObjectScale(oObject);

        this.randomFlipObject(oObject);
    };

    this.setSpeed = function (fValue) {
        _fSpeed = fValue;
    };

    this.update = function () {
        for (var i = 0; i < _aObject.length; i++) {
            var iNewX = _aObject[i].getX() + _fSpeed;
            var iNewY = _aObject[i].getY();

            _aObject[i].setPosition(iNewX, iNewY);

            if (_aObject[i].getX() < PARALLAXE_OBJ_X_RANDOMIZE) {
                this.randomizeObject(_aObject[i]);
            }
        }
    };

    this._init(iXPos, iYPos, oParentContainer);

    return this;
}
