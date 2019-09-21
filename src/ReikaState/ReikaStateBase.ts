import { ReikaBase } from "../ReikaBase";

export abstract class ReikaStateBase{
    public isCatchable:boolean;
    public abstract doAction(reikaBase:ReikaBase):void;
}