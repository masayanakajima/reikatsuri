import { GameProgressState } from "./GameProgressState";
import { TimeManager } from "../GameManager/TimeManager";
import { TimeStateBase } from "./TimeStateBase";
import { commonDefine } from "../Common/commonDefine";
import * as tl from "@akashic-extension/akashic-timeline";
import { entityUtil } from "../Util/entityUtil";

export class ReadyState extends TimeStateBase{

    private timeline:tl.Timeline;
    private label:g.Label;
    private countdown:g.AudioAsset;
    private gamestart:g.AudioAsset;

    constructor(scene:g.Scene){
        super(scene);
        this.label = entityUtil.createRedLabel(1,{x:320,y:160},scene,40);
        entityUtil.setLabelText(this.label,"3");
        this.timeline = new tl.Timeline(scene);
        this.countdown = scene.assets["Countdown"] as g.AudioAsset;
        //this.gamestart = scene.assets["gamestart"] as g.AudioAsset;
        this.readyAnimation();
    }
    
    public doAction(timeManager:TimeManager){
        if(timeManager.getPlaySec()==commonDefine.READY_TIME){
            //this.gamestart.play().changeVolume(0.2);
            timeManager.setState(new GameProgressState(this.scene));
            timeManager.frameCount = 0;
            this.label.destroy();
        }
    }

    private readyAnimation(){
        this.timeline.clear();
        const tween = this.timeline.create(
            this.label,
            {
                modified:this.label.invalidate,
                destroyed:this.label.destroyed
            }
        );
        for(let i = 0;i<commonDefine.READY_TIME;i++){
            tween.call(()=>{this.countdown.play().changeVolume(0.2)});
            tween.to({scaleX:1.4,scaleY:1.4},commonDefine.READY_TIME*1000/3);
            tween.call(()=>{
                this.label.scaleX = 1.0;
                this.label.scaleY = 1.0;
                entityUtil.setLabelText(this.label,(commonDefine.READY_TIME-i-1).toString());
            });
        }
    }
}