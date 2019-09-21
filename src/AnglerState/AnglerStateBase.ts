import { AnglerManager } from "../GameManager/AnglerManager";

export abstract class AnglerStateBase{

    public abstract doAction(angler:AnglerManager):void;
    public abstract onClick(angler:AnglerManager):void;

}