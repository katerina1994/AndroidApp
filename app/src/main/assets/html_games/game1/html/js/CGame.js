function CGame(oData, iLevel) {
    var _bStartGame;
    var _iScore;
    var _iLevelScore;
    var _iTotalScore;
    var _iLevel;
    var _iState;
    var _iTotCoins;
    var _iObtainCoins;
    var _oInterface;
    var _oBg = null;
    var _oCharacter;
    var _oLevelPlatforms;
    var _oLevelObject;
    var _oParallaxObject;
    var _oSea = null;
    var _oSoundLevelComplete;
    var _fDecrease;
    var _szPrevMaterial;
    var _bFromAir = false;
    var _bDrecreaseVol = false;

    this._init = function () {

        _bStartGame = false;
        _iScore = 0;
        _iTotalScore = 0;
        _iLevelScore = 0;
        _iObtainCoins = 0;
        _iTotCoins = 0;

        _iLevel = iLevel;

        _iState = GAME_STATE_HELP;

        for (var i = 0; i < _iLevel; i++) {
            _iScore += s_aScores[i];
        }

        if (_iScore === undefined) {
            _iScore = 0;
        }

        _iTotalScore = _iScore;

        this.createLevel();

        var oSpriteCharacter = s_oSpriteLibrary.getSprite("player");

        this._createPlayer(oSpriteCharacter, s_aLevelDiagram[_iLevel].playerX, s_aLevelDiagram[_iLevel].playerY, s_oStage);

        this.createSea();

        _oInterface = new CInterface();

        _oInterface.refreshScore(_iTotalScore);

        _oInterface.refreshLevelCounter(_iLevel + 1);

        _iState = GAME_STATE_HELP;

        setVolume(s_oSoundTrack, 0.35);
    };

    this.createParallaxeObject = function () {
        _oParallaxObject = new CParallaxObject(0, 0, s_oStage);

        var szMaterial = s_aLevelDiagram[_iLevel].material;

        var iYPos = 0;

        if (szMaterial === "ice") {
            iYPos = PARALLAXE_Y_POS_ICE;
        } else if (szMaterial === "volcano" || szMaterial === "mountain") {
            iYPos = PARALLAXE_Y_POS_VM;
        }

        for (var i = 0; i < MAX_NUM_PARALLAXE; i++) {
            var iRandX = Math.floor(Math.random() * CANVAS_WIDTH);
            var iType = 0;

            if (szMaterial === "volcano") {
                iType = Math.round(Math.random() * 1);
            }

            _oParallaxObject.addObject(iRandX, iYPos, szMaterial, iType);
        }
        _oParallaxObject.setSpeed(PARALLAX_SPEED);
    };

    this._createPlayer = function (oSprite, iX, iY, oContainer) {
        _oCharacter = new CCharacter(iX, iY, oSprite, oContainer);
        _oCharacter.stopAnimation();
    };

    this.createLevel = function () {
        var aLevelDiagram = s_aLevelDiagram[_iLevel].platform;
        var iRow = aLevelDiagram.length;
        var iCol = aLevelDiagram[0].length;

        var szMaterial = s_aLevelDiagram[_iLevel].material;

        if (!_oBg) {
            _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_" + szMaterial));
            _oBg.on("mousedown", this._onMouseDown);
            _oBg.on("pressup", this._onPressUp);
            _szPrevMaterial = szMaterial;
            s_oStage.addChild(_oBg);
        } else if (_szPrevMaterial !== szMaterial) {
            _oBg.image = s_oSpriteLibrary.getSprite("bg_" + szMaterial);
        }
        this.createParallaxeObject();

        _oLevelPlatforms = new CLevelPlatforms(0, 0, s_oStage);

        this.createLevelObject();

        var iX = FIRST_PLATFORM_X;
        var iY = PLATFORM_Y_START;

        var iID = 0;
        for (var j = 0; j < iCol; j++) {
            iY = PLATFORM_Y_START;
            for (var i = 0; i < iRow; i++) {
                iY += 50;
                if (aLevelDiagram[i][j] !== -1) {
                    _oLevelPlatforms.addPlatform(iX, iY, iID, szMaterial, aLevelDiagram[i][j]);
                    iID++;
                }
            }
            iX += 50;
        }

        _oLevelPlatforms.createArrival(s_aLevelDiagram[_iLevel].last_platform);
    };

    this.createLevelObject = function () {
        var aLevelObjects = s_aLevelDiagram[_iLevel].objects;

        _oLevelObject = new CLevelObjects(0, 0, s_oStage);

        var iID = 0;

        for (var i = 0; i < aLevelObjects.length; i++) {
            var iX = aLevelObjects[i].x + 100;
            var iY = aLevelObjects[i].y;
            var iType = aLevelObjects[i].gid;
            if (iType === 0) {
                _iTotCoins++;
            }
            _oLevelObject.addObject(iX, iY, iID, iType);
            iID++;
        }
    };

    this.createSea = function () {
        if (s_aLevelDiagram[_iLevel].material === "ice") {
            _oSea = new CSea(0, 0, s_oStage);
            _oSea.setSpeed(PLATFORM_SPEED);
        }
    };

    this._onMouseDown = function () {
        if (!_bStartGame || _oCharacter.getCollisionWithPlatform() === false || _iState !== GAME_STATE_PLAY) {
            return;
        }

        _oCharacter.moveUp();
        _oCharacter.stayMouseDown(true);
        _oCharacter.collisionWithPlatform(false);
        _oCharacter.changeState("jump");
        playSound("jump", 1, 0);
    };

    this.win = function () {
        var iPrecScore = _iTotalScore;
        _iTotalScore = _iScore;

        if (s_iLevelReached < _iLevel + 2) {
            s_iLevelReached = _iLevel + 2;
        }

        if (_iLevelScore > s_aScores[_iLevel]) {
            s_aScores[_iLevel] = _iLevelScore;
        }
        var iPercent = this.calculatePercentCoins();

        if (iPercent > s_aPercentage[_iLevel]) {
            s_aPercentage[_iLevel] = iPercent;
        }

        saveItem("olaf_levelreached", s_iLevelReached);
        saveItem("olaf_scores", JSON.stringify(s_aScores));
        saveItem("olaf_percentage", JSON.stringify(s_aPercentage));

        if (_iLevel >= s_aLevelDiagram.length - 1) {
            _oInterface.createCongratulations(_iTotalScore, iPercent, _iLevelScore, iPrecScore);
            _oSoundLevelComplete = playSound("game_completed", 1, -1);
            _fDecrease = DECREASE_FACTOR_VOL_GAME_COMPLETED;
        } else {
            _oInterface.createWinPanel(_iTotalScore, iPercent, _iLevelScore, iPrecScore, _iLevel);
            _oSoundLevelComplete = playSound("level_completed", 1, -1);
            _fDecrease = DECREASE_FACTOR_VOL_LEVEL_COMPLETED;
        }

        setVolume(s_oSoundTrack, 0.0);

        $(s_oMain).trigger("end_level", _iLevel);

        _iScore = _iTotalScore;
    };

    this.calculatePercentCoins = function () {
        var fTotPerc = (_iObtainCoins / _iTotCoins) * 100;

        return Math.floor(fTotPerc);
    };

    this._onPressUp = function () {
        if (!_bStartGame || _iState !== GAME_STATE_PLAY) {
            return;
        }
        _oCharacter.stayMouseDown(false);
    };

    this.unload = function () {
        _bStartGame = false;

        _oInterface.unload();

        _oCharacter.unload();

        if (_oSoundLevelComplete) {
            _oSoundLevelComplete.destroy();
            _oSoundLevelComplete = null;
        }

        s_oStage.removeAllChildren();

        createjs.Tween.removeAllTweens();

    };

    this.onExit = function () {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);

        s_oMain.gotoMenu();
    };

    this._onExitHelp = function () {
        $(s_oMain).trigger("start_level", _iLevel);
        
        _bStartGame = true;
        
        _oCharacter.playAnimation();
        _iState = GAME_STATE_PLAY;
    };

    this.unpause = function (bVal) {
        _bStartGame = bVal;
        if (bVal === true) {
            _oCharacter.playAnimation();
        } else {
            _oCharacter.stopAnimation();
        }
    };

    this.changeState = function (iState) {
        _iState = iState;
    };

    this.nextLevel = function () {
        _iLevel++;
        if (_oSoundLevelComplete) {
            _oSoundLevelComplete.destroy();
            _oSoundLevelComplete = null;
        }
        setVolume(s_oSoundTrack, 0.35);

        if (_szPrevMaterial === "ice" && _szPrevMaterial !== s_aLevelDiagram[_iLevel].material && _oSea) {
            _oSea.unload();
            _oSea = null;
        }
        $(s_oMain).trigger("start_level", _iLevel);
        _oInterface.refreshLevelCounter(_iLevel + 1);
        this.restartLevel();
    };

    this._onEnd = function () {
        this.unload();
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoCongratulations(_aResults, _iScore);
    };

    this.gameOver = function () {
        _iState = GAME_STATE_FINISH;
        _bStartGame = false;
        _oInterface.createLosePanel(_iScore);
    };

    this.addScore = function (iVal) {
        _iScore += iVal;
        _iLevelScore += iVal;
        _oInterface.refreshScore(_iScore);
    };

    this.restartLevel = function () {
        _oCharacter.removeTweens();
        this.unloadLevel();
        _iScore = _iTotalScore;
        _iLevelScore = 0;
        _iTotCoins = 0;
        _iObtainCoins = 0;
        _oInterface.refreshScore(_iScore);
        _oCharacter.setPosition(s_aLevelDiagram[_iLevel].playerX - 10, s_aLevelDiagram[_iLevel].playerY);
        _oCharacter.playerIDPlatform(0);
        _oCharacter.changeState("run");
        _oCharacter.resetJump();
        this.createLevel();
        _oLevelPlatforms.setSpeed(PLATFORM_SPEED);
        _oParallaxObject.setSpeed(PARALLAX_SPEED);
        if (_oSea)
            _oSea.setSpeed(PLATFORM_SPEED);
        _oLevelObject.setSpeed(PLATFORM_SPEED);
        if (_oSoundLevelComplete) {
            _oSoundLevelComplete.destroy();
            _oSoundLevelComplete = null;
        }
        setVolume(s_oSoundTrack, 0.35);
        _bStartGame = true;
    };

    this.unloadLevel = function () {
        _oLevelPlatforms.unload();
        _oLevelPlatforms = null;
        _oParallaxObject.unload();
        _oParallaxObject = null;
        _oLevelObject.unload();
        _oLevelObject = null;
    };

    this.platformFinished = function () {
        _iState = GAME_STATE_FINISH;
        _oLevelPlatforms.setSpeed(0);
        if (_oSea)
            _oSea.setSpeed(-0.5);
        var fDistanceX = _oLevelPlatforms.getArrival().getY() - _oCharacter.getY();
        if (fDistanceX >= TOLLERANCE_Y_FOR_ANIMATION) {
            _bFromAir = true;
        } else {
            _bFromAir = false;
        }
        _oCharacter.animationArrival(_oLevelPlatforms.getArrival(), _oLevelPlatforms.getPlatformByID(_oLevelPlatforms.getArrival().getIDPlatform()), _bFromAir);
    };

    this.collisionPlatform = function (oColInfo) {
        if (oColInfo.collide === false && _oCharacter.getCollisionWithPlatform() === false) {
            _oCharacter.collisionWithPlatform(true);
            _oCharacter.setPosition(_oCharacter.getX(), oColInfo.y + OFFSET_HEIGHT_PLATFORM_CHRACTER);
            if (_iState === GAME_STATE_PLAY) {
                _oCharacter.changeState("run");
            }
        }
    };

    this.collisionWall = function () {
        _oLevelPlatforms.setSpeed(0);
        _oParallaxObject.setSpeed(0);
        if (_oSea)
            _oSea.setSpeed(-0.5);
        _oLevelObject.setSpeed(0);

        _oCharacter.changeState("fall");
        _oCharacter.collisionWithPlatform(false);
    };

    this.fallLimit = function () {
        if (_oSea !== null) {
            if (_oCharacter.getY() > POSITION_Y_SEA + 50) {
                _oCharacter.playSeaAnimation();
                _bFromAir = true;
                playSound("splash", 1, 0);
                _iState = GAME_STATE_GAMEOVER;
                _oSea.setSpeed(-0.5);
            }
        } else {
            if (_oCharacter.getY() > FALL_LIMIT_Y) {
                this.gameOver();
                playSound("hero_falling", 1, 0);
                _iState = GAME_STATE_GAMEOVER;
            }
        }
    };

    this.spikeCollision = function () {
        if (_oSea)
            _oSea.setSpeed(-0.5);
        this.changeState(GAME_STATE_GAMEOVER);
        _oCharacter.playDeadSpikeAnimation();
        playSound("hero_spike", 1, 0);
    };

    this.decreaseVolumeSoundLevelComplete = function (bVal) {
        _bDrecreaseVol = bVal;
    };

    this.unloadObject = function (iID) {
        _oLevelObject.unloadObject(iID);
    };

    this.addObtainCoin = function () {
        _iObtainCoins++;
    };

    this.update = function () {
        switch (_iState) {
            case GAME_STATE_HELP:

                break;
            case GAME_STATE_PLAY:
                if (_bStartGame) {

                    var oPlayerInfo = {rect: _oCharacter.getRectangle(), id: _oCharacter.getIDPlatform()};

                    var oColInfo = _oLevelPlatforms.update(oPlayerInfo);
                    _oLevelObject.update(oPlayerInfo);

                    _oCharacter.playerIDPlatform(oColInfo.id);

                    if (oColInfo.collision === COLLISION_PLATFORM) {
                        this.collisionPlatform(oColInfo);
                    } else if (oColInfo.collision === COLLISION_WALL) {
                        this.collisionWall();
                    } else if (oColInfo.collision === COLLISION_NOTHING) {
                        _oCharacter.collisionWithPlatform(false);
                        _oLevelPlatforms.getPlatformByID(oColInfo.id).setCollideYet(false);
                    }

                    _oParallaxObject.update();
                    if (_oSea)
                        _oSea.update();

                    this.fallLimit();

                    _oCharacter.update();

                }
                break;
            case GAME_STATE_FINISH:
                if (_bStartGame) {
                    if (!_bFromAir && _oCharacter.getCollisionWithPlatform() === false) {
                        var oPlayerInfo = {rect: _oCharacter.getRectangle(), id: _oCharacter.getIDPlatform()};

                        var oColInfo = _oLevelPlatforms.update(oPlayerInfo);

                        _oCharacter.playerIDPlatform(oColInfo.id);

                        if (oColInfo.collision === COLLISION_PLATFORM) {
                            this.collisionPlatform(oColInfo);
                            _oCharacter.changeState("lands");
                        }
                        _oCharacter.update();
                    }
                }
                if (_oSea)
                    _oSea.update();

                if (_bDrecreaseVol) {
                    if (_oSoundLevelComplete)
                        _oSoundLevelComplete.volume = _oSoundLevelComplete.volume * _fDecrease;
                }
                break;
            case GAME_STATE_GAMEOVER:
                if (_oSea)
                    _oSea.update();
                break;
        }
    };

    s_oGame = this;

    PLATFORM_SPEED = oData.platform_velocity;
    HERO_DOWN_ACCELLERATION = oData.hero_down_speed;
    DECELLERATION_MOUSE_DOWN = oData.decelleration_mouse_down;
    DECELLERATION_NORMAL = oData.decelleration_normal;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;
    JUMP_MULTIPLY = oData.jump_multiplier;
    PARALLAX_SPEED = oData.parallax_speed;
    COIN_SCORE = oData.coin_score;
    PERCENTAGE_STARS = oData.percentage_stars;
    ENABLE_FULLSCREEN = oData.fullscreen;
    
    this._init();
}

var s_oGame;