import { ReikaStateBase } from "./ReikaStateBase";
import { ReikaBase } from "../ReikaBase";
import { FeverManager } from "../GameManager/FeverManager";
import { GameScene } from "../GameScene";

export class RollingState extends ReikaStateBase{

    private isUp:boolean;

    constructor(){
        super();
				this.isUp = GameScene.getRandom(0,1)?true:false;
				this.isCatchable = true;
    }

    public doAction(reikaBase:ReikaBase){
        if(this.isOutOfWidth(reikaBase))
					reikaBase.isRight = !reikaBase.isRight;
				if(this.isOutOfHeight(reikaBase))
					this.isUp = !this.isUp;

				const distance = FeverManager.getInstance().FeverMagnitudedParameter(reikaBase.reikaInfo.speed);
				reikaBase.x += reikaBase.isRight?-distance:distance;
				reikaBase.y+=this.isUp?-distance:distance;
				reikaBase.angle+= FeverManager.getInstance().FeverMagnitudedParameter(3);
				reikaBase.modified();
    }

    protected isOutOfWidth(reikaBase:ReikaBase):boolean{
				return reikaBase.x>g.game.width+reikaBase.width||reikaBase.x<-reikaBase.width;
		}
	
		protected isOutOfHeight(reikaBase:ReikaBase):boolean{
				return reikaBase.y+reikaBase.height>g.game.height||reikaBase.y<120;
		}
}