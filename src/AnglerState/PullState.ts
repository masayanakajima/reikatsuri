import { AnglerStateBase } from "./AnglerStateBase";
import { AnglerManager } from "../GameManager/AnglerManager";
import { FeverManager } from "../GameManager/FeverManager";
import { commonDefine } from "../Common/commonDefine";
import { entityUtil } from "../Util/entityUtil";
import { ParalysedState } from "./ParalysedState";
import { DropState } from "./DropState";
import { ScoreManager } from "../GameManager/ScoreManager";

export class PullState extends AnglerStateBase{

    public doAction(angler:AnglerManager){
		const distance = -FeverManager.getInstance().FeverMagnitudedParameter(commonDefine.FISH_PULL_SPEED);
		angler.line.height += distance;
        angler.moveNeedles(distance);
        this.searchReika(angler);
		if(!angler.newNeedleFlag)
			angler.newNeedleFlag = this.checkNeedleFull(angler)
		
		if(this.checkNeedleHeight(angler))
			this.checkAndRelease(angler);
    }

    public onClick(angler:AnglerManager){
        
    }
    
    private checkAndRelease(angler:AnglerManager){
		let paralysisFlag = false;
		angler.needles.forEach((needle)=>{
			paralysisFlag = paralysisFlag||needle.getCaughtReikaName() == "unti";
		});

		if(paralysisFlag){
            this.releaseReika(angler);
            angler.setState(new ParalysedState());
		}else{
			angler.needles.forEach((needle)=>{
				needle.addScoreAndFever();
			});
            entityUtil.changeSpriteSurface(angler.body,angler.scene.assets["tsuribito2"]);
			this.releaseReika(angler);
			ScoreManager.getInstance().instantScoreViewer.start();
            angler.setState(new DropState());
        }
    }
    
   private searchReika(angler:AnglerManager){
       angler.needles.forEach((needle)=>{
           needle.searchReika();
       })
   }

	/*
	* needleが一つでもy座標40以下になったらtrue
	*/
	private checkNeedleHeight(angler:AnglerManager):boolean{
		let flag = false;
		angler.needles.forEach((needle)=>{
			flag = flag || needle.y <= 40;
		});
		return flag;

	}

	/*
	*needleで空のものが一つもないならtrue
	*/
	private checkNeedleFull(angler:AnglerManager):boolean{
		let flag = true;
		angler.needles.forEach((needle)=>{
			flag = flag && !needle.IsEmpty;
		});
		return flag;
    }
    
    private releaseReika(angler:AnglerManager){
		angler.needles.forEach((needle)=>{
			needle.reset();
		});
	}

}