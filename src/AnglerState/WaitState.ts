import { AnglerStateBase } from "./AnglerStateBase";
import { AnglerManager } from "../GameManager/AnglerManager";
import { PullState } from "./PullState";

export class WaitState extends AnglerStateBase{

    public doAction(angler:AnglerManager){

    }

    public onClick(angler:AnglerManager){
        angler.setState(new PullState());
    }
}