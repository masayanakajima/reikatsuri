import { DistributionState, ReikaInfo } from "../Common/commonType";
import { commonDefine } from "../Common/commonDefine";
import { TimeManager } from "./TimeManager";
import { FeverManager } from "./FeverManager";

interface DistrInfo{
    reikaInfo:ReikaInfo;
    number:number;
}

type Distribution = DistrInfo[];

const earlyDistribution:Distribution = [ //{reikaInfo:commonDefine.NemuReika,number:100},
                                        {reikaInfo:commonDefine.UntiReika,number:15},
                                        {reikaInfo:commonDefine.HuwaReika,number:25},
                                        {reikaInfo:commonDefine.GyakuReika,number:40},
                                        {reikaInfo:commonDefine.YuReika,number:45},
                                        {reikaInfo:commonDefine.GataReika,number:50}
                                    ];

const midDistribution:Distribution = [{reikaInfo:commonDefine.UntiReika,number:15},
                                      {reikaInfo:commonDefine.YuReika,number:30},
                                    　{reikaInfo:commonDefine.HuwaReika,number:45},
                                    　{reikaInfo:commonDefine.GyakuReika,number:50},
                                    　{reikaInfo:commonDefine.NemuReika,number:55},
                                      {reikaInfo:commonDefine.TakoReika,number:70}];

const lateDistribution:Distribution =　[{reikaInfo:commonDefine.UntiReika,number:15},
                                        {reikaInfo:commonDefine.YuReika,number:35},
  　                                    {reikaInfo:commonDefine.GyakuReika,number:35},
  　                                    {reikaInfo:commonDefine.NemuReika,number:50},
                                        {reikaInfo:commonDefine.TakoReika,number:60},
                                        {reikaInfo:commonDefine.YuiZarashi,number:100}];

const feverDistribution:Distribution = [{reikaInfo:commonDefine.UntiReika,number:20},
                                        {reikaInfo:commonDefine.YuReika,number:40},
                                        {reikaInfo:commonDefine.OdoReika,number:60},
                                        {reikaInfo:commonDefine.GataReika,number:70},
                                        {reikaInfo:commonDefine.ReikaTyon,number:90},
                                        {reikaInfo:commonDefine.NemuReika,number:100}
                                        ];
    
export class DistributionManager{
    private static _instance:DistributionManager;
    private state:DistributionState = DistributionState.EARLY;
    private distribution = {"early":earlyDistribution,"mid":midDistribution,"late":lateDistribution,"fever":feverDistribution};  

    private constructor(){

    }

    public static getInstance():DistributionManager{
        if(!this._instance)
           this._instance = new DistributionManager();

        return this._instance;
    }

    private getCurrentDistribution():Distribution{
        switch(this.state){
            case DistributionState.EARLY:
                return this.distribution["early"];
            case DistributionState.MID:
                return this.distribution["mid"];
            case DistributionState.LATE:
                return this.distribution["late"];
            case DistributionState.FEVER:
                return this.distribution["fever"]
        }
            
    }

    public updateState(){
        if(FeverManager.getInstance().isFeverMode()){
            this.state = DistributionState.FEVER;
            return;
        }

        if(TimeManager.getInstance().getCurrentFrame()>=20*g.game.fps)
            this.state = DistributionState.MID;

        if(TimeManager.getInstance().getCurrentFrame()>=50*g.game.fps)
            this.state = DistributionState.LATE;

    }

   
    public getReikaInfo(random:number):ReikaInfo{
        const length = Object.keys(this.getCurrentDistribution()).length;
        for(let i = 0;i<length;i++){
            const distrInfo = this.getCurrentDistribution()[i]
            if(random<distrInfo.number)
                return distrInfo.reikaInfo;
        }
        return commonDefine.NormalReika;
    }
}