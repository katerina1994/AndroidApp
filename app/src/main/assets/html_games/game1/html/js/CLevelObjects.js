function CLevelObjects(iXPos, iYPos, oParentContainer) {

    var _oContainerObjects;
    var _oParentContainer;
    var _aObject;
    var _iSpeed;

    this._init = function (iXPos, iYPos, oParentContainer) {

        _iSpeed = PLATFORM_SPEED;

        _oParentContainer = oParentContainer;

        _aObject = new Array();
        _oContainerObjects = new createjs.Container();
        _oContainerObjects.x = iXPos;
        _oContainerObjects.y = iYPos;

        _oParentContainer.addChild(_oContainerObjects);
        _oParentContainer.setChildIndex(_oContainerObjects, 3);
    };

    this.addObject = function (iXPos, iYPos, iID, iType) {
        _aObject[iID] = new CObject(iXPos, iYPos, iID, iType, _oContainerObjects);
        if (iXPos > ON_VISIBLE_X) {
            _aObject[iID].setVisible(false);
        }
    };

    this.setSpeed = function (fValue) {
        _iSpeed = fValue;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainerObjects.x = iXPos;
        _oContainerObjects.y = iYPos;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainerObjects);
        _oContainerObjects = null;
        _aObject = null;
    };

    this.unloadObjects = function () {
        for (var i = 0; i < _aObject.length; i++) {
            _oContainerObjects.removeChild(_aObject[i]);
        }
        _aObject = null;
    };

    this.unloadObject = function (iID) {
        _aObject[iID].unload();
        _aObject.splice(iID, 1);

        for (var i = 0; i < _aObject.length; i++) {
            _aObject[i].setID(i);
        }

    };

    this.getObjectByID = function (iVal) {
        return _aObject[iVal];
    };

    this.manageObjects = function () {
        for (var i = 0; i < _aObject.length; i++) {
            var iNewX = _aObject[i].getX() + _iSpeed;
            var iNewY = _aObject[i].getY();
            _aObject[i].setPosition(iNewX, iNewY);
            var iX = _aObject[i].getX();
            if (iX < ON_VISIBLE_X && iX > -_aObject[i].getWidth()) {
                _aObject[i].setVisible(true);
            } else {
                _aObject[i].setVisible(false);
            }
        }
    };

    this.collisionObjects = function (oPlayerInfo) {
        var oPlayerRect = oPlayerInfo.rect;

        for (var i = 0; i < _aObject.length; i++) {
            if (_aObject[i].getVisible()) {
                _aObject[i].controlCollision(oPlayerRect);
            }
        }
    };

    this.update = function (oPlayerInfo) {
        this.manageObjects();

        this.collisionObjects(oPlayerInfo);
    };

    this._init(iXPos, iYPos, oParentContainer);

    return this;
}




