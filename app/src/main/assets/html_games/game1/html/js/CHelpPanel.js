function CHelpPanel(iXPos, iYPos, oSprite) {
    var _oHelpBg;
    var _oGroup;
    var _oFade;
    var _oGroup;
    var _oButContinue;
    var _bClick = false;

    this._init = function (iXPos, iYPos, oSprite) {
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH * 0.5;
        _oHelpBg.y = CANVAS_HEIGHT * 0.5;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;

        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;


        _oGroup.addChild(_oFade);

        _oGroup.addChild(_oHelpBg);

        s_oStage.addChild(_oGroup);

        this.page1();

        _oGroup.on("pressup", function () {
            s_oHelpPanel._onExitHelp();
        }, null, true);

        if (!s_bMobile)
            _oGroup.cursor = "pointer";
    };

    this.page1 = function () {
        var iSizeText = 30;

        var oInputTextStroke;

        oInputTextStroke = new createjs.Text(TEXT_HELP_INPUT, iSizeText + "px " + FONT_GAME, "#000000");
        oInputTextStroke.textAlign = "center";
        oInputTextStroke.textBaseline = "middle";
        oInputTextStroke.x = CANVAS_WIDTH * 0.5;
        oInputTextStroke.y = CANVAS_HEIGHT * 0.5 - 85;
        oInputTextStroke.outline = 3;

        _oGroup.addChild(oInputTextStroke);

        var oInputText;

        oInputText = new createjs.Text(TEXT_HELP_INPUT, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oInputText.textAlign = "center";
        oInputText.textBaseline = "middle";
        oInputText.lineWidth = 600;
        oInputText.x = oInputTextStroke.x;
        oInputText.y = oInputTextStroke.y;

        _oGroup.addChild(oInputText);

        var oSpriteCharacter = s_oSpriteLibrary.getSprite("player");

        var oCharacter = new CCharacter(oInputText.x - 90, oInputTextStroke.y + 40, oSpriteCharacter, _oGroup);

        oCharacter.changeState("start_jump_help");

        var oSpriteInput;
        if (s_bMobile) {
            oSpriteInput = s_oSpriteLibrary.getSprite("help_touch");
        } else {
            oSpriteInput = s_oSpriteLibrary.getSprite("help_mouse");
        }

        var oInput = createBitmap(oSpriteInput);

        oInput.x = oInputTextStroke.x + 90;
        oInput.y = oInputTextStroke.y;
        oInput.regX = oSpriteInput.width * 0.5;
        oInput.regY = oSpriteInput.height * 0.5;

        _oGroup.addChild(oInput);

        var oText1Struct;

        oText1Struct = new createjs.Text(TEXT_HELP_COIN, iSizeText + "px " + FONT_GAME, "#000000");
        oText1Struct.textAlign = "center";
        oText1Struct.textBaseline = "middle";
        oText1Struct.lineWidth = 400;
        oText1Struct.x = CANVAS_WIDTH * 0.5;
        oText1Struct.y = CANVAS_HEIGHT * 0.5;
        oText1Struct.outline = 3;

        _oGroup.addChild(oText1Struct);

        var oText1;

        oText1 = new createjs.Text(oText1Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText1.textAlign = "center";
        oText1.textBaseline = "middle";
        oText1.lineWidth = oText1Struct.lineWidth;
        oText1.x = oText1Struct.x;
        oText1.y = oText1Struct.y;

        _oGroup.addChild(oText1);

        var oCoin;

        var oSpriteCoin = s_oSpriteLibrary.getSprite("object_0");

        var iDivH = 4;
        var iDivW = 5;

        var oData = {
            images: [oSpriteCoin],
            // width, height & registration point of each sprite
            frames: {width: oSpriteCoin.width / iDivW, height: oSpriteCoin.height / iDivH, regX: (oSpriteCoin.width / 2) / iDivW, regY: (oSpriteCoin.height / 2) / iDivH},
            animations: {
                normal: [0, 19, "normal"]
            }
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        oCoin = createSprite(oSpriteSheet, "run", (oSpriteCoin.width / 2) / iDivW, (oSpriteCoin.height / 2) / iDivH, oSpriteCoin.width / iDivW, oSpriteCoin.height / iDivH);

        oCoin.x = CANVAS_WIDTH * 0.5 - 100;
        oCoin.y = oText1Struct.y;

        _oGroup.addChild(oCoin);

        var oText2Struct;

        oText2Struct = new createjs.Text(TEXT_HELP_SPIKE, iSizeText + "px " + FONT_GAME, "#000000");
        oText2Struct.textAlign = "center";
        oText2Struct.textBaseline = "middle";
        oText2Struct.lineWidth = 600;
        oText2Struct.x = CANVAS_WIDTH * 0.5;
        oText2Struct.y = CANVAS_HEIGHT * 0.5 + 85;
        oText2Struct.outline = 3;

        _oGroup.addChild(oText2Struct);

        var oText2;

        oText2 = new createjs.Text(oText2Struct.text, iSizeText + "px " + FONT_GAME, TEXT_COLOR);
        oText2.textAlign = "center";
        oText2.textBaseline = "middle";
        oText2.lineWidth = 600;
        oText2.x = oText2Struct.x;
        oText2.y = oText2Struct.y;

        _oGroup.addChild(oText2);

        var oSpike;

        var oSpriteSpike = s_oSpriteLibrary.getSprite("object_1");

        oSpike = createBitmap(oSpriteSpike);
        oSpike.x = CANVAS_WIDTH * 0.5 - 100;
        oSpike.y = oText2Struct.y;
        oSpike.regX = oSpriteSpike.width / 2;
        oSpike.regY = oSpriteSpike.height / 2;

        _oGroup.addChild(oSpike);

        createjs.Tween.get(_oGroup).to({alpha: 1}, 300, createjs.Ease.cubicOut);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 210, CANVAS_HEIGHT * 0.5 + 80, oSpriteContinue, _oGroup);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(_oGroup);
    };

    this.unload = function () {
        s_oStage.removeChild(_oGroup);
        s_oHelpPanel = null;
        _oGroup.off("click", function () {});
        _oButContinue.unload();
        _oButContinue = null;
    };

    this._onExitHelp = function () {
        if (_bClick) {
            return;
        }
        _bClick = true;
        playSound("click", 1, 0);
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500).call(function () {
            s_oHelpPanel.unload();
            s_oGame._onExitHelp();
        });

    };

    s_oHelpPanel = this;

    this._init(iXPos, iYPos, oSprite);

}

var s_oHelpPanel = null;