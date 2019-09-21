import { AnglerStateBase } from "./AnglerStateBase";
import { AnglerManager } from "../GameManager/AnglerManager";
import { entityUtil } from "../Util/entityUtil";
import { WaitState } from "./WaitState";
import { FeverManager } from "../GameManager/FeverManager";
import { commonDefine } from "../Common/commonDefine";

export class DropState extends AnglerStateBase{

    public doAction(angler:AnglerManager){
		const distance = FeverManager.getInstance().FeverMagnitudedParameter(commonDefine.FISH_PULL_SPEED)*3
		angler.line.height+=distance;
		angler.moveNeedles(distance);
		if(angler.line.height >= 300){
			if(angler.newNeedleFlag){
				angler.addNewNeedle();
				angler.newNeedleFlag = false;
			}
            entityUtil.changeSpriteSurface(angler.body,angler.scene.assets["tsuribito"]);
            angler.setState(new WaitState());
		}
    }

    public onClick(angler:AnglerManager){
        
    }
    

    
}