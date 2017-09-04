function CCharacter(iXPos, iYPos, oSprite, oParentContainer) {

    var _oCharacter;
    var _oParentContainer;
    var _oRectangle;
    var _oShape = null;
    var _iSpeedAccDown;
    var _iSpeedDown;
    var _bMouseDown = false;
    var _iIDPlatform;
    var _iWidth;
    var _iHeight;
    var _oRectangleMeasure;
    var _bCollide = false;
    var _bOnPlatform = false;

    this._init = function (iXPos, iYPos, oSprite, oParentContainer) {

        _oParentContainer = oParentContainer;

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 10, height: oSprite.height / 6, regX: (oSprite.width / 2) / 10, regY: (oSprite.height) / 6},
            animations: {
                run: [0, 15, "run", 1],
                jump: [16, 19, "jump_stay"],
                lands_run: [20, 23, "run"],
                lands: [20, 26, "idle"],
                shot: [28, 40, "shot_remain"],
                dance: [41, 53, "dance"],
                fall: [54, 58, "fall_stay"],
                ice: [59],
                idle: [26],
                jump_stay: [19],
                fall_stay: [58],
                shot_remain: [40],
                start_jump: {
                    frames: [25, 24, 23, 22, 21, 20, 19, 18],
                    next: "jump"
                },
                start_jump_help: {
                    frames: [25, 24, 23, 22, 21, 20, 19],
                    next: "jump_help",
                    speed: 0.5
                },
                jump_help: [19, 19, "lands_help", 0.1],
                lands_help: [20, 26, "start_jump_help", 0.5]
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oCharacter = createSprite(oSpriteSheet, "run", (oSprite.width / 2) / 10, (oSprite.height) / 6, oSprite.width / 10, oSprite.height / 6);

        _oCharacter.x = iXPos;
        _oCharacter.y = iYPos;

        _iSpeedAccDown = HERO_DOWN_ACCELLERATION;

        _iWidth = oSprite.width / 10;
        _iHeight = oSprite.height / 6;

        _oRectangleMeasure = {x: iXPos - _iWidth + OFFSET_PLAYER_COL_POINT.x, y: iYPos - _iHeight + OFFSET_PLAYER_COL_POINT.y,
            w: _iWidth + OFFSET_PLAYER_COL_DIMENSION.x, h: _iHeight + OFFSET_PLAYER_COL_DIMENSION.y};

        _oRectangle = new createjs.Rectangle(_oRectangleMeasure.x, _oRectangleMeasure.y,
                _oRectangleMeasure.w, _oRectangleMeasure.h);

        if (SHOW_COLLISION_SHAPE) {
            _oShape = new createjs.Shape();
            _oShape.graphics.beginFill("#00ff00").drawRect(_oRectangle.x, _oRectangle.y,
                    _oRectangle.width, _oRectangle.height);
            _oShape.alpha = 0.5;
            _oParentContainer.addChild(_oShape);
        }

        _iSpeedDown = 0;
        _iIDPlatform = 0;

        _oParentContainer.addChild(_oCharacter);

    };

    this.getX = function () {
        return _oCharacter.x;
    };

    this.getY = function () {
        return _oCharacter.y;
    };

    this.onPlatform = function (bVal) {
        _bOnPlatform = bVal;
    };

    this.getOnPlatform = function () {
        return _bOnPlatform;
    };

    this.setPosition = function (iXPos, iYPos) {
        if (iXPos === null) {

        } else {
            _oCharacter.x = iXPos;
        }
        if (iYPos === null) {

        } else {
            _oCharacter.y = iYPos;
        }

        this.rectMovement();
    };

    this.rotate = function (iValue) {
        _oCharacter.scaleX = iValue;
    };

    this.setVisible = function (bVal) {
        _oCharacter.visible = bVal;
    };

    this.changeState = function (szState) {

        _oCharacter.gotoAndPlay(szState);

    };

    this.stopAnimation = function () {
        _oCharacter.stop();
    };

    this.playAnimation = function () {
        _oCharacter.play();
    };

    this._onFinishAnimation = function () {
        _oCharacter.on("animationend", function () {

        });
    };

    this.collisionWithPlatform = function (bVal) {
        if (_bCollide === true) {
            _oCharacter.gotoAndPlay("jump");
        }
        _bCollide = bVal;
    };

    this.getCollisionWithPlatform = function () {
        return _bCollide;
    };

    this.getRectangle = function () {
        return _oRectangle;
    };

    this.moveUp = function () {
        _iSpeedDown = -HERO_DOWN_ACCELLERATION * JUMP_MULTIPLY;
        _iSpeedAccDown = -HERO_DOWN_ACCELLERATION;
    };

    this.stayMouseDown = function (bVal) {
        _bMouseDown = bVal;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oCharacter);
        s_oCharacter = null;
    };

    this.playerIDPlatform = function (iVal) {
        _iIDPlatform = iVal;
    };

    this.getIDPlatform = function () {
        return _iIDPlatform;
    };

    this.resetJump = function () {
        _iSpeedAccDown = HERO_DOWN_ACCELLERATION;
    };

    this.rectMovement = function () {
        _oRectangleMeasure = {x: _oCharacter.x - _iWidth + OFFSET_PLAYER_COL_POINT.x, y: _oCharacter.y - _iHeight + OFFSET_PLAYER_COL_POINT.y,
            w: _iWidth + OFFSET_PLAYER_COL_DIMENSION.x, h: _iHeight + OFFSET_PLAYER_COL_DIMENSION.y};

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


    this.animationArrival = function (oArrival, oLastPlatform, bFromAir) {
        createjs.Tween.removeTweens(_oCharacter);
        if (bFromAir) {
            _oCharacter.gotoAndPlay("shot");
            createjs.Tween.get(_oCharacter).wait(300).call(function () {
                oArrival.destroyEffect();
            });
            createjs.Tween.get(_oCharacter).to({y: oLastPlatform.getY() + 30, x: oArrival.getX() - 10}, 500, createjs.Ease.quadIn).call(function () {
                _oCharacter.gotoAndPlay("lands");
                _oCharacter.on("animationend", function () {
                    _oCharacter.gotoAndStop("idle");
                    _oCharacter.removeAllEventListeners();
                });
                createjs.Tween.get(_oCharacter).wait(1200).call(function () {
                    _oCharacter.gotoAndPlay("dance");
                    _oCharacter.on("animationend", function () {
                        s_oGame.win();
                        _oCharacter.removeAllEventListeners();
                    });
                });
            });
        } else {
            if (_bCollide) {
                _oCharacter.gotoAndPlay("idle");
            }
            createjs.Tween.get(_oCharacter).wait(300).call(function () {
                _oCharacter.gotoAndPlay("start_jump");
                createjs.Tween.get(_oCharacter).wait(180).call(function () {
                    createjs.Tween.get(_oCharacter).to({y: oArrival.getY() - 100, x: oArrival.getX() - 20}, 750, createjs.Ease.cubicOut).call(function () {
                        _oCharacter.gotoAndPlay("shot");
                        createjs.Tween.get(_oCharacter).wait(300).call(function () {
                            oArrival.destroyEffect();
                        });
                        createjs.Tween.get(_oCharacter).to({y: oLastPlatform.getY() + 30, x: oArrival.getX() - 10}, 500, createjs.Ease.circIn).call(function () {
                            _oCharacter.gotoAndPlay("lands");
                            _oCharacter.on("animationend", function () {
                                _oCharacter.gotoAndStop("idle");
                                _oCharacter.removeAllEventListeners();
                            });
                            createjs.Tween.get(_oCharacter).wait(1200).call(function () {
                                _oCharacter.gotoAndPlay("dance");
                                _oCharacter.on("animationend", function () {
                                    s_oGame.win();
                                    _oCharacter.removeAllEventListeners();
                                });
                            });
                        });
                    });
                });
            });
        }
    };

    this.playSeaAnimation = function () {
        var oParent = this;
        createjs.Tween.get(_oCharacter).wait(300).call(function () {
            _oCharacter.gotoAndStop("ice");
        });
        createjs.Tween.get(_oCharacter).to({y: POSITION_Y_SEA + 150}, 1000, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(_oCharacter).to({y: POSITION_Y_SEA + 40}, 1000, createjs.Ease.cubicOut).call(function () {
                createjs.Tween.get(_oCharacter).to({y: POSITION_Y_SEA + 70}, 700, createjs.Ease.cubicInOut).call(function () {
                    oParent.loopBounceSea();
                    createjs.Tween.get(_oCharacter).wait(600).call(function () {
                        s_oGame.gameOver();
                    });
                });
            });
        });
    };

    this.playDeadSpikeAnimation = function () {
        _oCharacter.gotoAndPlay("fall");
        s_oGame.changeState(GAME_STATE_GAMEOVER);
        createjs.Tween.get(_oCharacter).to({y: _oCharacter.y - 50, x: _oCharacter.x + 30}, 500, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(_oCharacter).to({y: CANVAS_HEIGHT + _iHeight}, 750, createjs.Ease.cubicIn).call(function () {
                s_oGame.gameOver();
            });
        });
    };

    this.loopBounceSea = function () {
        var oParent = this;
        var iRotation = Math.random() * 5;
        createjs.Tween.get(_oCharacter).to({y: POSITION_Y_SEA + 50, rotation: iRotation}, 1000, createjs.Ease.quartInOut).call(function () {
            var iRotation = Math.random() * -5;
            createjs.Tween.get(_oCharacter).to({y: POSITION_Y_SEA + 70, rotation: iRotation}, 1000, createjs.Ease.quartInOut).call(function () {
                oParent.loopBounceSea();
            });
        });
    };

    this.removeTweens = function () {
        createjs.Tween.removeTweens(_oCharacter);
    };

    this.update = function () {
        if (_bMouseDown) {
            if (_iSpeedAccDown < HERO_DOWN_ACCELLERATION) {
                _iSpeedAccDown += DECELLERATION_MOUSE_DOWN;
            } else {
                _iSpeedAccDown = HERO_DOWN_ACCELLERATION;
            }
        } else {
            if (_iSpeedAccDown < HERO_DOWN_ACCELLERATION) {
                _iSpeedAccDown += DECELLERATION_NORMAL;
            } else {
                _iSpeedAccDown = HERO_DOWN_ACCELLERATION;
            }
        }

        if (_oCharacter.y < -100) {
            _oCharacter.y = -100;
        }

        if (!_bCollide) {
            _iSpeedDown += _iSpeedAccDown;
            _oCharacter.y += _iSpeedDown;
        } else {
            _iSpeedDown = 0;
        }

        this.rectMovement();


    };

    s_oCharacter = this;

    this._init(iXPos, iYPos, oSprite, oParentContainer);
}

var s_oCharacter;

