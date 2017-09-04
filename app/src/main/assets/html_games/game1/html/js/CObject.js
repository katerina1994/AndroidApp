function CObject(iXPos, iYPos, iID, iType, oParentContainer) {

    var _oParentContainer;
    var _oObject;
    var _oRectangle;
    var _oRectangleMeasure;
    var _oShape = null;
    var _iWidth;
    var _iHeight;
    var _iHeightHalf;
    var _iID;
    var _iType;
    var _bCollideYet = false;

    this._init = function (iXPos, iYPos, iID, iType, oParentContainer) {

        _oParentContainer = oParentContainer;

        _iID = iID;

        _iType = iType;

        var oSprite = s_oSpriteLibrary.getSprite("object_" + iType);

        var iDivH = 1;
        var iDivW = 1;

        if (_iType === 0) {
            iDivH = 4;
            iDivW = 5;

            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / iDivW, height: oSprite.height / iDivH, regX: 0, regY: (oSprite.height / 2) / iDivH},
                animations: {
                    normal: [0, 19, "normal"]
                }
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oObject = createSprite(oSpriteSheet, "run", 0, (oSprite.height / 2) / iDivH, oSprite.width / iDivW, oSprite.height / iDivH);

        } else {

            _oObject = createBitmap(oSprite);
            _oObject.regX = 0;
            _oObject.regY = (oSprite.height / 2);
        }

        _oObject.x = iXPos;
        _oObject.y = iYPos;

        _iWidth = oSprite.width / iDivW;
        _iHeight = oSprite.height / iDivH;

        _iHeightHalf = _iHeight * 0.5;

        _oRectangleMeasure = {x: iXPos, y: iYPos - _iHeightHalf, w: _iWidth, h: _iHeight};

        _oRectangle = new createjs.Rectangle(iXPos, iYPos, _iWidth, _iHeight);

        if (SHOW_COLLISION_SHAPE) {
            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y, _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            _oParentContainer.addChild(_oShape);
        }

        _oParentContainer.addChild(_oObject);

    };

    this.setPosition = function (iXPos, iYPos) {
        _oObject.x = iXPos;
        _oObject.y = iYPos;

        this.rectMovement();
    };

    this.rectMovement = function () {

        _oRectangleMeasure = {x: _oObject.x, y: _oObject.y - _iHeightHalf, w: _iWidth, h: _iHeight};

        _oRectangle.setValues(_oRectangleMeasure.x, _oRectangleMeasure.y, _oRectangleMeasure.w, _oRectangleMeasure.h);

        if (SHOW_COLLISION_SHAPE) {
            if (_oShape) {
                _oParentContainer.removeChild(_oShape);
                _oShape = null;
            }

            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y, _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            _oParentContainer.addChild(_oShape);
        }
    };

    this.getX = function () {
        return _oObject.x;
    };
    this.getY = function () {
        return _oObject.y;
    };

    this.getRectX = function () {
        return _oRectangle.x;
    };

    this.getWidth = function () {
        return _iWidth;
    };

    this.setVisible = function (bVal) {
        _oObject.visible = bVal;
    };

    this.collideYet = function () {
        return _bCollideYet;
    };

    this.getVisible = function () {
        return _oObject.visible;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oObject);
    };

    this.getID = function () {
        return _iID;
    };

    this.setID = function (iVal) {
        _iID = iVal;
    };

    this.controlCollision = function (oPlayerRectangle) {
        if (!_oRectangle) {
            return;
        }

        if (_oRectangle.intersects(oPlayerRectangle)) {
            if (iType === 0) {
                s_oGame.addScore(COIN_SCORE);
                playSound("coin", 1, 0);
                s_oGame.addObtainCoin();
                s_oGame.unloadObject(_iID);
            } else if (iType === 1) {
                s_oGame.spikeCollision();
            }
        }
    };

    this._init(iXPos, iYPos, iID, iType, oParentContainer);

    return this;
}





