import { SwimState } from "./SwimState";
import { ReikaBase } from "../ReikaBase";
import { FeverManager } from "../GameManager/FeverManager";

export class VibrateSwimState extends SwimState{
    public doAction(reikaBase:ReikaBase){
        const amplitude = FeverManager.getInstance().FeverMagnitudedParameter(5);
		const frequency = FeverManager.getInstance().FeverMagnitudedParameter(1);
        reikaBase.x += amplitude*Math.sin(reikaBase.frame*frequency);
        super.doAction(reikaBase);
    }
}