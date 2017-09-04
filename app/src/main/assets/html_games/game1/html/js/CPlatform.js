function CPlatform(iXPos, iYPos, iID, szMaterial, iType, oParentContainer) {

    var _oParentContainer;
    var _oPlatform;
    var _oRectangle;
    var _oRectangleMeasure;
    var _oShape = null;
    var _iWidth;
    var _iHeight;
    var _iID;
    var _bCollideYet = false;

    this._init = function (iXPos, iYPos, iID, szMaterial, iType, oParentContainer) {

        _oParentContainer = oParentContainer;

        _iID = iID;

        var oSprite = s_oSpriteLibrary.getSprite("platform_" + szMaterial + "_" + iType);

        _oPlatform = createBitmap(oSprite);
        _oPlatform.x = iXPos;
        _oPlatform.y = iYPos;

        _iWidth = oSprite.width + OFFSET_PLATFORM_COL_DIMENSION[iType].x;
        _iHeight = oSprite.height + OFFSET_PLATFORM_COL_DIMENSION[iType].y;

        _oPlatform.regY = 0;

        _oRectangleMeasure = {x: iXPos + OFFSET_PLATFORM_COL_POINT[iType].x, y: iYPos + OFFSET_PLATFORM_COL_POINT[iType].y, w: _iWidth, h: _iHeight};

        _oRectangle = new createjs.Rectangle(iXPos + OFFSET_PLATFORM_COL_POINT[iType].x, iYPos + OFFSET_PLATFORM_COL_POINT[iType].y, _iWidth, _iHeight);

        if (SHOW_COLLISION_SHAPE) {
            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y, _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            _oParentContainer.addChild(_oShape);
        }

        _oParentContainer.addChild(_oPlatform);

    };

    this.setPosition = function (iXPos, iYPos) {
        _oPlatform.x = iXPos;
        _oPlatform.y = iYPos;

        this.rectMovement();
    };

    this.rectMovement = function () {

        _oRectangleMeasure = {x: _oPlatform.x + OFFSET_PLATFORM_COL_POINT[iType].x, y: _oPlatform.y + OFFSET_PLATFORM_COL_POINT[iType].y, w: _iWidth, h: _iHeight};

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
        return _oPlatform.x;
    };
    this.getY = function () {
        return _oPlatform.y;
    };

    this.getRectX = function () {
        return _oRectangle.x;
    };

    this.getWidth = function () {
        return _iWidth;
    };

    this.setVisible = function (bVal) {
        _oPlatform.visible = bVal;
    };

    this.collideYet = function () {
        return _bCollideYet;
    };

    this.setCollideYet = function (bVal) {
        _bCollideYet = bVal;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oPlatform);
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
        var oResult;
        if (_oRectangle.intersects(oPlayerRectangle)) {
            if (oPlayerRectangle.x + oPlayerRectangle.width * 0.6 > _oRectangle.x && _oRectangle.y >= Math.floor(oPlayerRectangle.y) + OFFSET_HEIGHT_COLLISION_PLATFORM) {

                oResult = {collision: COLLISION_PLATFORM, id: _iID, y: _oPlatform.y, collide: _bCollideYet};
                _bCollideYet = true;
            } else {
                oResult = {collision: COLLISION_WALL, id: _iID, y: _oPlatform.y};
            }
        } else {
            _bCollideYet = false;
            oResult = {collision: COLLISION_NOTHING, id: _iID, y: _oPlatform.y, collide: _bCollideYet};
        }
        return oResult;
    };

    this._init(iXPos, iYPos, iID, szMaterial, iType, oParentContainer);

    return this;
}





