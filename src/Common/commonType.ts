export enum DistributionState{
    EARLY,MID,LATE,FEVER
}

export interface ReikaInfo{
    speed:number;
    point:number;
	caught_src:string;
	swim_src:string;
}
