var Sheep = require('Sheep');
require('SkyScroller');
require('GroundScroller')

var State = cc.Enum({
    Menu: -1,
    Run : -1,
    Over: -1
});

var GameManager = cc.Class({
    extends: cc.Component,
    //-- 属性
    properties: {
        //-- 获取绵羊
        sheep: Sheep,
        
        //-- 获取gameOverMenu对象
        gameOverMenu: cc.Node,
        //-- 获取分数对象
        scoreText: cc.Label,
        //-- 获取背景音效
        gameBgAudio: {
            default: null,
            url: cc.AudioClip
        },
        //-- 获取死亡音效
        dieAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    statics: {
        State
    },

    onLoad () {
        D.GameManager = GameManager;
        D.game = this;

        // activate colliders
        cc.director.getCollisionManager().enabled = true;

        //-- 游戏状态
        this.state = State.Menu;
        //-- 分数
        this.score = 0;
        this.scoreText.string = this.score;
        this.gameOverMenu.active = false;
        this.sheep.init();
    },
    //-- 开始
    start () {
        this.state = State.Run;
        this.score = 0;
        cc.audioEngine.playMusic(this.gameBgAudio, true);
        this.sheep.startRun();
    },
    gameOver () {
        cc.audioEngine.playEffect(this.dieAudio);
        D.pipeManager.reset();
        this.state = State.Over;
        this.gameOverMenu.active = true;
        this.gameOverMenu.getComponent('GameOverMenu').score.string = this.score;
    },
    //-- 更新分数
    gainScore () {
        //-- 分数+1
        this.score++;
        this.scoreText.string = this.score;
    }
});
