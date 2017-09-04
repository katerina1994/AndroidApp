function CArrival(iXPos, iYPos) {

    var _oContainer;
    var _oRectangle;
    var _oRectangleMeasure;
    var _oArrivalRight;
    var _oArrivalLeft;
    var _oShape;
    var _iHeight;
    var _iIDPlatform;
    var _oOffsetRecPos;

    this._init = function (iXPos, iYPos) {

        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;


        var oSpriteRight = s_oSpriteLibrary.getSprite("arrival_1");

        _oArrivalRight = createBitmap(oSpriteRight);

        _oArrivalRight.regX = (oSpriteRight.width * 0.5);
        _oArrivalRight.regY = (oSpriteRight.height * 0.5);

        _oArrivalRight.x = _oArrivalRight.regX * 0.26;
        _oArrivalRight.y = 0;

        _oContainer.addChild(_oArrivalRight);

        var oSpriteLeft = s_oSpriteLibrary.getSprite("arrival_0");

        _oArrivalLeft = createBitmap(oSpriteLeft);

        _oArrivalLeft.regX = (oSpriteLeft.width * 0.5);
        _oArrivalLeft.regY = (oSpriteLeft.height * 0.5);

        _oArrivalLeft.x = -_oArrivalLeft.regX * 0.26;
        _oArrivalLeft.y = 0;

        _oContainer.y = iYPos - oSpriteLeft.height * 0.4;

        _oContainer.addChild(_oArrivalLeft);

        _iHeight = oSpriteLeft.height + OFFSET_RECT_ARRIVAL.y;

        _oOffsetRecPos = {x: _oArrivalLeft.regX + OFFSET_RECT_ARRIVAL.x, y: _oArrivalLeft.regY + OFFSET_RECT_ARRIVAL.y};

        _oRectangleMeasure = {x: iXPos - _oOffsetRecPos.x, y: iYPos - _oOffsetRecPos.y, w: WEIGHT_ARRIVAL, h: _iHeight};

        _oRectangle = new createjs.Rectangle(iXPos, iYPos, _oRectangleMeasure.w, _oRectangleMeasure.h);

        if (SHOW_COLLISION_SHAPE) {
            if (_oShape) {
                s_oStage.removeChild(_oShape);
                _oShape = null;
            }
            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y, _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            s_oStage.addChild(_oShape);
        }
        s_oStage.addChild(_oContainer);

    };

    this.destroyEffect = function () {
        var oParent = this;

        playSound("broken_stone", 1, 0);
        playSound("hit_axe", 1, 0);

        createjs.Tween.get(_oArrivalRight).to({y: -50}, 500, createjs.Ease.circOut).call(function () {
            createjs.Tween.get(_oArrivalRight).to({y: CANVAS_HEIGHT}, 1000, createjs.Ease.circIn);
        });

        createjs.Tween.get(_oArrivalRight).to({x: 300, rotation: 270}, 2500, createjs.Ease.circOut).call(function () {
            oParent.unload();
        });

        createjs.Tween.get(_oArrivalLeft).to({y: -50}, 500, createjs.Ease.circOut).call(function () {
            createjs.Tween.get(_oArrivalLeft).to({y: CANVAS_HEIGHT}, 1000, createjs.Ease.circIn);
        });

        createjs.Tween.get(_oArrivalLeft).to({x: -300, rotation: -270}, 2500, createjs.Ease.circOut).call(function () {
        });
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        this.positionRect();
    };

    this.positionRect = function () {
        _oRectangleMeasure = {x: _oContainer.x - _oOffsetRecPos.x, y: _oContainer.y - _oOffsetRecPos.y, w: WEIGHT_ARRIVAL, h: _iHeight};

        _oRectangle.setValues(_oRectangleMeasure.x, _oRectangleMeasure.y, _oRectangleMeasure.w, _oRectangleMeasure.h);

        if (SHOW_COLLISION_SHAPE) {
            if (_oShape) {
                s_oStage.removeChild(_oShape);
                _oShape = null;
            }
            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y, _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            s_oStage.addChild(_oShape);
        }
    };

    this.setIDPlatform = function (iValue) {
        _iIDPlatform = iValue;
    };

    this.getIDPlatform = function () {
        return _iIDPlatform;
    };

    this.controlCollision = function (oPlayerRectangle) {
        if (!_oRectangle) {
            return;
        }
        var iResult;

        if (_oRectangle.intersects(oPlayerRectangle)) {
            iResult = COLLISION_ARRIVAL;
        } else {
            iResult = COLLISION_NOTHING;
        }
        return iResult;
    };

    this.getVisible = function () {
        return _oContainer.visible;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this._init(iXPos, iYPos);
}
