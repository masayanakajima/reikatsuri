import { TimeStateBase } from "./TimeStateBase";
import { DistributionManager } from "../GameManager/DistributionManager";
import { ReikaManager } from "../GameManager/ReikaManager";
import { TimeManager } from "../GameManager/TimeManager";
import { BeforeEndState } from "./BeforeEndState";
import { GameScene } from "../GameScene";
import { commonDefine } from "../Common/commonDefine";
import { FeverManager } from "../GameManager/FeverManager";

export class GameProgressState extends TimeStateBase{

    constructor(scene:g.Scene){
        super(scene);
        for(let i = 0;i < 2;i++){
            const random = GameScene.getRandom(0,99);
            const reikaInfo = DistributionManager.getInstance().getReikaInfo(random);
            var reika = ReikaManager.getInstance().getReikaFromName(scene,reikaInfo);
            var randomX:number = GameScene.getRandom(0,commonDefine.SPAWN_RIGHT_ARRAY.length-1);
            reika.InitializePosition(i==0,randomX);
            scene.append(reika);
        }
        FeverManager.getInstance().playBGM();
    }

    public doAction(timeManager:TimeManager){

        timeManager.gameUpdate();
        
        if(timeManager.remainTime()==commonDefine.ALERT_TIME)
            timeManager.setState(new BeforeEndState(this.scene));
        
    }

    
}