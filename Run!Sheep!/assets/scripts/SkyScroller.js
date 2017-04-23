var SkyScroller = cc.Class({
    extends: cc.Component,

    properties: {
        //-- X轴边缘
        resetX: -1100,
    },
    
    update (dt) {
        if (D.game.state !== D.GameManager.State.Run) {
            return;
        }
        var x = this.node.x;
        
        //-- 因为天空距离远近的关系，所以天空的滚动速度设置为地面的1/4
        x += D.speed / 4 * dt;
        if (x <= this.resetX) {
            x -= this.resetX;
        }
        this.node.x = x;
    }
});