import { TimeManager } from "../GameManager/TimeManager";

export abstract class TimeStateBase{
    protected scene:g.Scene;
    constructor(scene:g.Scene){
        this.scene = scene;
    }

    public abstract doAction(timeManager:TimeManager):void;
}