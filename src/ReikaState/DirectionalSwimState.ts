import { SwimState } from "./SwimState";
import { ReikaBase } from "../ReikaBase";
import { GameScene } from "../GameScene";

export class DirectionalSwimState extends SwimState{

    private animationFinished:boolean;

    constructor(){
        super();
        this.animationFinished = true;
    }
    
    public doAction(reikaBase:ReikaBase){
		if(reikaBase.frameNumber == 3)
			this.animationFinished = true;
			
		if(reikaBase.frameNumber == 0&&this.animationFinished){
			reikaBase.scaleX = reikaBase.isRight?1:-1;
			reikaBase.stop();
		}

		if(reikaBase.frame%30==0&&GameScene.getRandom(0,10)==0)
			this.changeDirection(reikaBase);
        
        super.doAction(reikaBase);
	}

	protected changeDirection(reikaBase:ReikaBase){
		reikaBase.start();
		reikaBase.isRight = !reikaBase.isRight;
		this.animationFinished = false;
		reikaBase.modified();
	}
}