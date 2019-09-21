import { ReikaStateBase } from "./ReikaStateBase";
import { ReikaBase } from "../ReikaBase";

export class CatchState extends ReikaStateBase{

    constructor(){
        super();
        this.isCatchable = false;
    }

    public doAction(reikaBase:ReikaBase){
        reikaBase.invalidate();
    }
}