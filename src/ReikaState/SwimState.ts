import { ReikaStateBase } from "./ReikaStateBase";
import { ReikaBase } from "../ReikaBase";
import { FeverManager } from "../GameManager/FeverManager";

export class SwimState extends ReikaStateBase{

    constructor(){
        super();
        this.isCatchable = true;
    }

    public doAction(reikaBase:ReikaBase){
        const distance = FeverManager.getInstance().FeverMagnitudedParameter(reikaBase.reikaInfo.speed);
		reikaBase.x+=reikaBase.isRight?-distance:distance;
		this.breath(reikaBase);
		
		if(this.isOutOfScene(reikaBase)){
			reikaBase.destroy();
			return;
		}
	    reikaBase.invalidate();
    }

    

	protected breath(reikaBase:ReikaBase){
		const amplitude = 5;
		const wavelength = FeverManager.getInstance().FeverMagnitudedParameter(15);
		reikaBase.y = reikaBase.initialY + Math.abs(amplitude*Math.sin(reikaBase.frame/wavelength));
	}

	

	protected isOutOfScene(reikaBase:ReikaBase):boolean{
		return (!reikaBase.isRight&&reikaBase.x>g.game.width)||(reikaBase.isRight&&reikaBase.x<-reikaBase.width);
	}
}