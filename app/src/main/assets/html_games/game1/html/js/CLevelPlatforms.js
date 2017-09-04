function CLevelPlatforms(iXPos, iYPos, oParentContainer) {

    var _oContainerPlatform;
    var _oParentContainer;
    var _oArrival;
    var _aPlatform;
    var _iSpeed;

    this._init = function (iXPos, iYPos, oParentContainer) {

        _iSpeed = PLATFORM_SPEED;

        _oParentContainer = oParentContainer;

        _aPlatform = new Array();

        _oContainerPlatform = new createjs.Container();
        _oContainerPlatform.x = iXPos;
        _oContainerPlatform.y = iYPos;

        _oParentContainer.addChild(_oContainerPlatform);
        _oParentContainer.setChildIndex(_oContainerPlatform, 2);
    };

    this.addPlatform = function (iXPos, iYPos, iID, szMaterial, iType) {
        _aPlatform[iID] = new CPlatform(iXPos, iYPos, iID, szMaterial, iType, _oContainerPlatform);

        if (iXPos > ON_VISIBLE_X) {
            _aPlatform[iID].setVisible(false);
        }

    };

    this.setSpeed = function (fValue) {
        _iSpeed = fValue;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainerPlatform.x = iXPos;
        _oContainerPlatform.y = iYPos;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainerPlatform);
        _oContainerPlatform = null;
        _aPlatform = null;
        _oArrival.unload();
        _oArrival = null;
    };

    this.unloadPlatform = function () {
        for (var i = 0; i < _aPlatform.length; i++) {
            _oContainerPlatform.removeChild(_aPlatform[i]);
        }
        _aPlatform = null;
    };

    this.repositionArrivalToLastPlatform = function () {
        var oPlatform = _aPlatform[_aPlatform.length - 1];
        _oArrival.setPosition(oPlatform.getX() + oPlatform.getWidth() * 0.5 + OFFSET_ARRIVAL_POS.x, oPlatform.getY() + OFFSET_ARRIVAL_POS.y);
    };

    this.getPlatformByID = function (iVal) {
        return _aPlatform[iVal];
    };

    this.moveArrival = function () {
        var iNewX = _oArrival.getX() + _iSpeed;
        var iNewY = _oArrival.getY();

        _oArrival.setPosition(iNewX, iNewY);

        if (iNewX < ON_VISIBLE_X) {
            _oArrival.setVisible(true);
        }
    };

    this.managePlatform = function () {
        for (var i = 0; i < _aPlatform.length; i++) {
            var iNewX = _aPlatform[i].getX() + _iSpeed;
            var iNewY = _aPlatform[i].getY();
            _aPlatform[i].setPosition(iNewX, iNewY);
            var iX = _aPlatform[i].getX();
            if (iX < ON_VISIBLE_X && iX > -_aPlatform[i].getWidth()) {
                _aPlatform[i].setVisible(true);
            } else {
                _aPlatform[i].setVisible(false);
            }
        }
        this.moveArrival();
    };

    this.createArrival = function (iOffsetLastPlatform) {
        var iID = _aPlatform.length - 1 + iOffsetLastPlatform;
        var oPlatform = _aPlatform[iID];
        _oArrival = new CArrival(oPlatform.getX() + oPlatform.getWidth() * 0.5 + OFFSET_ARRIVAL_POS.x, oPlatform.getY() + OFFSET_ARRIVAL_POS.y);
        _oArrival.setVisible(false);
        _oArrival.setIDPlatform(iID);
    };

    this.collisionPlatforms = function (oPlayerInfo) {
        var iID = oPlayerInfo.id;
        var oPlayerRect = oPlayerInfo.rect;
        var oCollision = _aPlatform[iID].controlCollision(oPlayerRect);

        if (oCollision.collision === COLLISION_NOTHING) {
            for (var i = oPlayerInfo.id; i < oPlayerInfo.id + PREVIEW_COLLISION; i++) {
                if (i > _aPlatform.length - 1) {

                } else {
                    var oCollisionNext = _aPlatform[i].controlCollision(oPlayerRect);
                    if (oCollisionNext.collision === COLLISION_PLATFORM || oCollisionNext.collision === COLLISION_WALL) {
                        oCollisionNext.collide = oCollision.collide;
                        return oCollisionNext;
                    }
                }
            }
        }
        return oCollision;
    };

    this.collisionArrival = function (oPlayerInfo) {
        if (_oArrival.getVisible() === true) {
            var iResult = _oArrival.controlCollision(oPlayerInfo);

            if (iResult === COLLISION_ARRIVAL) {
                s_oGame.platformFinished();
            }
        }
    };

    this.getArrival = function () {
        return _oArrival;
    };

    this.update = function (oPlayerInfo) {

        this.managePlatform();

        var oCollision = this.collisionPlatforms(oPlayerInfo);

        this.collisionArrival(oPlayerInfo.rect);

        return oCollision;
    };

    this._init(iXPos, iYPos, oParentContainer);

    return this;
}




