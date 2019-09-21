import {commonDefine} from "./Common/commonDefine";
import { ReikaInfo} from "./Common/commonType";
import { entityUtil } from "./Util/entityUtil";
import { ScoreManager } from "./GameManager/ScoreManager";
import { FeverManager } from "./GameManager/FeverManager";
import { ReikaManager } from "./GameManager/ReikaManager";
import { ReikaStateBase } from "./ReikaState/ReikaStateBase";
import { SwimState } from "./ReikaState/SwimState";
import { CatchState } from "./ReikaState/CatchState";
import { DirectionalSwimState } from "./ReikaState/DirectionalSwimState";
import { RollingState } from "./ReikaState/RollingState";
import { VibrateSwimState } from "./ReikaState/VibrateSwimState";
import { VibrateCatchState } from "./ReikaState/VibrateCatchState";
import { SwimUntiState } from "./ReikaState/UntiReikaState";
import { DirectionalMotionSwimState } from "./ReikaState/DirectionalMotionSwimState";

export class ReikaBase extends g.FrameSprite{
   
    public isRight:boolean;
	public frame:number;
	public reikaInfo:ReikaInfo;
	public initialY:number;
	public reikaState:ReikaStateBase;
	protected catchState:ReikaStateBase;

	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		const src = <g.ImageAsset>scene.assets[reikaInfo.swim_src];
		const height = src.height;
		const width = src.width;
		super({scene:scene,
			   src:src,
			   width:width,
			   height:height,
			   srcWidth:width,
			   srcHeight:height,
			  });
		this.reikaInfo = reikaInfo;
		this.frame = 0;
		this.reikaState = new SwimState();
		this.catchState = new CatchState();
		ReikaManager.getInstance().registerReika(this);
	}


	public InitializePosition(isRight:boolean,random:number){
		this.isRight = isRight;
		this.x = isRight?g.game.width:-this.width;
		this.initialY = isRight?commonDefine.SPAWN_RIGHT_ARRAY[random]:commonDefine.SPAWN_LEFT_ARRAY[random];
		this.y = this.initialY;
		this.scaleX = this.isRight?-1:1;
		this.modified();
	}
	
	public move(){
		this.frame++;
		this.reikaState.doAction(this);
	}


	public plusScoreAndFever(){
		FeverManager.getInstance().plusFeverGage(12);
		ScoreManager.getInstance().startPlus(this.reikaInfo.point);
	}

	public getPoint():number{
		return this.reikaInfo.point;
	}


	public getName():String{
		return this.reikaInfo.swim_src;
	}

	public changeCaughtState(){
		this.stop()
		this.reikaState = this.catchState;
		entityUtil.changeSpriteSurface(this,this.scene.assets[this.reikaInfo.caught_src]);
	}

	public getCenterX(){
		return this.x+this.width/2;
	}

	public getCenterY(){
		return this.y+this.height/2;
	}

	public isCatchable(){
		return this.reikaState.isCatchable;
	}

	destroy(){
		ReikaManager.getInstance().unregisterReika(this);
		super.destroy();
	}
	
}

export class GataReika extends ReikaBase{

    constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		this.reikaState = new VibrateSwimState();
		this.catchState = new VibrateCatchState();
	}

}

export class NormalReika extends ReikaBase{

	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		this.width = 120;
		this.height = 60;
		this.srcWidth = 120;
		this.srcHeight = 60;
		this.interval = 100;
		this.frames = [0,1,2,3];
		this.reikaState= new DirectionalSwimState();
		this.modified();
	}
	
}

export class TakoReika extends NormalReika{
	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		const scale = 1.2;
		this.width = 240*scale;
		this.height = 60*scale;
		this.srcWidth = 240;
		this.srcHeight = 60;
		this.loop = false;
		this.interval = 100;
		this.modified();
	}

}

export class YuReika extends NormalReika{
	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		const scale = 1.2;
		this.width = 240*scale;
		this.height = 60*scale;
		this.srcWidth = 240;
		this.srcHeight = 60;
		this.loop = false;
		this.interval = 100;
		this.modified();
	}

}

export class YuiZarashi extends NormalReika{
	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		const scale = 1.2;
		this.width = 240*scale;
		this.height = 60*scale;
		this.srcWidth = 240;
		this.srcHeight = 60;
		this.loop = true;
		this.interval = 300;
		this.frames = [0,1,2,3];
		this.modified();
		this.reikaState= new DirectionalMotionSwimState();
		this.start();
	}

	public InitializePosition(isRight:boolean,random:number){
		super.InitializePosition(isRight,random);
		this.scaleX = this.isRight?1:-1;
		this.modified();
	}

	public changeCaughtState(){
		this.reikaState = this.catchState;
		this.frames = [0,1,2,3];
		this.interval = 100
		this.modified();
		this.start();
	}
}

export class NemuReika extends ReikaBase{

	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		this.width = 140;
		this.height = 60;
		this.srcWidth = 140;
		this.srcHeight = 60;
		this.frames = [0,1,2,3];
		this.interval = 300;
		this.modified();
		this.reikaState = new RollingState();
		this.start();
	}

	public changeCaughtState(){
		this.reikaState = this.catchState;
	}

	
}

export class UntiReika extends ReikaBase{

	constructor(scene:g.Scene,reikaInfo:ReikaInfo){
		super(scene,reikaInfo);
		this.width = 300;
		this.height = 60;
		this.srcWidth = 300;
		this.srcHeight = 60;
		this.loop = false;
		this.interval = 100;
		this.reikaState = new SwimUntiState();
		this.modified();
	}

	public InitializePosition(isRight:boolean,random:number){
		this.isRight = isRight;
		this.x = isRight?g.game.width:-this.width;
		this.initialY = isRight?commonDefine.SPAWN_RIGHT_ARRAY[random]:commonDefine.SPAWN_LEFT_ARRAY[random];
		this.y = this.initialY;
		this.scaleX = this.isRight?-1:1;
		this.modified();
	}

}

export class Unti extends ReikaBase{

	
}