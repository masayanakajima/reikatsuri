import {DistributionManager} from "./DistributionManager";
import {commonDefine} from "../Common/commonDefine";
import {entityUtil} from "../Util/entityUtil";
import { TimeStateBase } from "../TimeState/TimeStateBase";
import { ReadyState } from "../TimeState/ReadyState";
import { FeverManager } from "./FeverManager";
import { ScoreManager } from "./ScoreManager";
import { AnglerManager } from "./AnglerManager";
import { ReikaManager } from "./ReikaManager";
import * as tl from "@akashic-extension/akashic-timeline";



export class TimeManager{
	public frameCount:number;
	public timerLabel:TimerLabel;
	public scene:g.Scene;
	private time:g.Sprite;
	private state:TimeStateBase;
	private static timeManager:TimeManager;

    private constructor(){
        
	}

	public static getInstance(){
		if(!this.timeManager)
			this.timeManager = new this();

		return this.timeManager;
	}

	public init(scene:g.Scene){
		this.scene = scene;
		this.frameCount = 0;
		this.timerLabel= new TimerLabel(scene);
		this.timerLabel.setText(String(this.remainTime()));
		this.time = new g.Sprite({scene:scene,src:scene.assets["time"],x:commonDefine.TIME_X-70,y:15})
		this.state = new ReadyState(scene);
		entityUtil.appendEntity(this.time,scene);
	}

    public frame2Sec():number{
        return this.frameCount/g.game.fps;
	}

	public getPlaySec():number{
		return Math.floor(this.frame2Sec());
	}

	public getCurrentFrame():number{
		return this.frameCount;
	}

    public remainTime():number{
		const remain = Math.floor(commonDefine.GAME_OVER_TIME/1000 - this.getPlaySec());
        return remain>=0?remain:0;
    }

    public updateTime(){
		this.frameCount+=1;
		this.state.doAction(this);
	}
	
	
	public setState(state:TimeStateBase){
		this.state = state;
	}

	public setInterval(updator:()=>void,intervalSec:number){
		if(this.frameCount%(g.game.fps*intervalSec)==0)
			updator();
	}

	public gameUpdate(){
		FeverManager.getInstance().gageUpdate();
		DistributionManager.getInstance().updateState();
		ScoreManager.getInstance().onUpdate();
		AnglerManager.getInstance().AnglerUpdate();
		ReikaManager.getInstance().update();
	
		this.setInterval(()=>{
			ReikaManager.getInstance().spawn(this.scene);
		},commonDefine.SPAWN_INTERVAL/FeverManager.getInstance().FeverMagnitudedParameter(1));

		this.setInterval(()=>{
			FeverManager.getInstance().minusFeverGage();
		},0.5)

        this.timerLabel.setText(String(this.remainTime()));
	}
	
}

export class TimerLabel{

	private normalLabel:g.Label;
	private emergencyLabel:g.Label;
	private currentLabel:g.Label;
	private timeline:tl.Timeline;

	constructor(scene:g.Scene){
		this.normalLabel = entityUtil.createWhiteLabel(6,{ x:commonDefine.TIME_X,y:commonDefine.TIME_Y },scene);
		this.emergencyLabel = entityUtil.createRedLabel(6,{ x:commonDefine.TIME_X,y:commonDefine.TIME_Y },scene);
		this.emergencyLabel.hide();
		this.currentLabel = this.normalLabel;
		this.timeline = new tl.Timeline(scene);
	}

	public setText(text:string){
		entityUtil.setLabelText(this.currentLabel,text);
	}

	public changeState(){
		this.normalLabel.hide();
		this.currentLabel = this.emergencyLabel;
		entityUtil.setLabelText(this.currentLabel,this.normalLabel.text);
		this.emergencyLabel.show();
		this.alertAnimation();
	}

	public alertAnimation(){
		this.timeline.clear();
		const tween:tl.Tween = this.timeline.create(
			this.emergencyLabel,
			{
				modified:this.emergencyLabel.invalidate,
				destroyed:this.emergencyLabel.destroyed
			}
		);
		tween.to({scaleX:1.5,scaleY:1.5},500);
		tween.con();
		tween.moveBy(-25,0,500);

		tween.to({scaleX:1.0,scaleY:1.0},500);
		tween.con();
		tween.moveBy(25,0,500);
		
	}
}