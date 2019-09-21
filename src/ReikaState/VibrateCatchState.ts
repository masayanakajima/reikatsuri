import { ReikaStateBase } from "./ReikaStateBase";
import { FeverManager } from "../GameManager/FeverManager";
import { ReikaBase } from "../ReikaBase";
import { CatchState } from "./CatchState";

export class VibrateCatchState extends CatchState{
    public doAction(reikaBase:ReikaBase){
        const amplitude = FeverManager.getInstance().FeverMagnitudedParameter(5);
		const frequency = FeverManager.getInstance().FeverMagnitudedParameter(1);
        reikaBase.x += amplitude*Math.sin(reikaBase.frame*frequency);
        super.doAction(reikaBase);
    }
}