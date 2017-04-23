var GroundScroller = cc.Class({
    extends: cc.Component,

    properties: {
        //-- X轴边缘
        resetX: -1100,
        
        distance: 0,
        
        pipeCounter: 0,
        
        pipeThreshold: 500,
        
        grassCounter: 0,
        
        grassThreshold: 1000
    },
    
    update (dt) {
        
        if (D.game.state !== D.GameManager.State.Run) {
            return;
        }
        var x = this.node.x;
        x += D.speed * dt;
        this.distance -= D.speed * dt;
        this.pipeCounter -= D.speed * dt;
        if(this.pipeCounter > this.pipeThreshold) {
            D.pipeManager.spawnPipe();
            this.pipeCounter = 0;
            this.pipeThreshold = 750 + Math.random() * 1250;
        }
        this.grassCounter -= D.speed * dt;
        if(this.grassCounter > this.grassThreshold) {
            D.pipeManager.spawnGrass();
            this.grassCounter = 0;
            this.grassThreshold = Math.random() * 5000;
        }
        if (this.distance > 50) {
            this.distance = 0;
            D.game.gainScore();
        }
        //-- 随着绵羊的跑动会不断减速
        D.speed += 4 * dt;
        if (x <= this.resetX) {
            x -= this.resetX;
        }
        this.node.x = x;
    },
});
