import { TimeManager } from "../GameManager/TimeManager";
import { TimeStateBase } from "./TimeStateBase";
import { commonDefine } from "../Common/commonDefine";
import * as tl from "@akashic-extension/akashic-timeline";
import { SceneBase } from "../SceneBase";
import { entityUtil } from "../Util/entityUtil";
import { GameScene } from "../GameScene";

export class BeforeEndState extends TimeStateBase{

    private isFinished = false;
	private timeline:tl.Timeline;
	private timeline2:tl.Timeline;
	private finishLabel:g.Sprite;
	private alertBG:g.Sprite;

    constructor(scene:g.Scene){
        super(scene);
		this.timeline = new tl.Timeline(scene);
		this.timeline2 = new tl.Timeline(scene);
        this.finishLabel = new g.Sprite({
			scene:scene,
			src:scene.assets["finishLabel"],
			x:680,
			y:100
		});
		this.alertBG = (this.scene as GameScene).alertBG;
		TimeManager.getInstance().timerLabel.changeState();
		this.alertAnimation();
	}

    doAction(timeManager:TimeManager){
		timeManager.gameUpdate();
		if(timeManager.frameCount%g.game.fps==0){
			timeManager.timerLabel.alertAnimation();
			this.alertAnimation();
		}
        
        if(timeManager.getPlaySec() >= commonDefine.GAME_OVER_TIME/1000)
			this.finishGame(timeManager.scene);
    }

    private finishGame(scene:g.Scene){
		if(this.isFinished)
			return;

		this.isFinished = true;
		scene.pointDownCapture.removeAll();
		scene.append(this.finishLabel);
		this.gameFinishAnimation(scene);
	}

	private alertAnimation(){
		this.timeline.clear();
		const tween:tl.Tween = this.timeline.create(
			this.alertBG,
			{
				modified:this.alertBG.modified,
				destroyed:this.alertBG.destroyed
			}
		);
		
		tween.fadeIn(500);
		tween.fadeOut(500);
		
		
	}

	private gameFinishAnimation(scene:g.Scene){
		this.timeline2.clear();
		const tween: tl.Tween = this.timeline2.create(
			this.finishLabel,
			{
				modified: this.finishLabel.modified,
				destroyed: this.finishLabel.destroyed
			}
		);
	
		tween.moveTo(20,100,200);
		tween.moveBy(0,0,1800);
		tween.call(()=>{
			(<SceneBase>scene).requestedNextScene.fire();
		});
		
	}
    
   

}