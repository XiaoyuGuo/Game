cc.Class({
    extends: cc.Component,
    properties: {
        speed: 0,
        botYRange: cc.p(0, 0),
        spacingRange: cc.p(0, 0),
        botGrass: cc.Node
    },
    onEnable () {
        let botYPos = this.botYRange.x - 50;
        this.botGrass.y = botYPos;
    },
    update (dt) {
        if (D.game.state !== D.GameManager.State.Run) {
            return;
        }

        this.node.x += D.speed * dt;

        var disappear = this.node.getBoundingBoxToWorld().xMax < 0;
        if (disappear) {
            D.pipeManager.despawnGrass(this);
        }
    }
});
