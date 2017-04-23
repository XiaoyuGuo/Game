const GrassGroup = require('GrassGroup')
const PipeGroup = require('PipeGroup');

cc.Class({
    extends: cc.Component,
    properties: {
        pipePrefab: cc.Prefab,
        grassPrefab: cc.Prefab,
        pipeLayer: cc.Node,
        initPipeX: 0,
        initGrassX: 0
    },
    onLoad () {
        D.pipeManager = this;
    },
    //-- 创建石头
    spawnPipe () {
        let pipeGroup = null;
        if (cc.pool.hasObject(pipeGroup)) {
            pipeGroup = cc.pool.getFromPool(pipeGroup);
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab).getComponent(PipeGroup);
        }
        this.pipeLayer.addChild(pipeGroup.node);
        pipeGroup.node.active = true;
        pipeGroup.node.x = this.initPipeX;
    },
    
    //-- 创建草
    spawnGrass () {
        let grassGroup = null;
        if (cc.pool.hasObject(grassGroup)) {
            grassGroup = cc.pool.getFromPool(grassGroup);
        } else {
            grassGroup = cc.instantiate(this.grassPrefab).getComponent(GrassGroup);
        }
        this.pipeLayer.addChild(grassGroup.node);
        grassGroup.node.active = true;
        grassGroup.node.x = this.initGrassX;
    },
    
    despawnGrass (grass) {
        grass.node.removeFromParent();
        grass.node.active = false;
        cc.pool.putInPool(grass);
    },
    
    despawnPipe (pipe) {
        pipe.node.removeFromParent();
        pipe.node.active = false;
        cc.pool.putInPool(pipe);
    },
    
    reset () {
        this.unschedule(this.spawnPipe);
        this.unschedule(this.spawnGrass);
    }
});
