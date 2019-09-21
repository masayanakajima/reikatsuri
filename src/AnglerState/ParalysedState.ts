import { AnglerStateBase } from "./AnglerStateBase";
import { AnglerManager } from "../GameManager/AnglerManager";
import { entityUtil } from "../Util/entityUtil";
import { DropState } from "./DropState";

export class ParalysedState extends AnglerStateBase{

    private paralysedFrame:number;

    constructor(){
        super();
        this.paralysedFrame = 0;
        entityUtil.changeSpriteSurface(AnglerManager.getInstance().body,AnglerManager.getInstance().scene.assets["tsuribito3"]);
		AnglerManager.getInstance().thunder.show();
        AnglerManager.getInstance().paralysisSound.play();
    }

    public onClick(angler:AnglerManager){
        
    }

    public doAction(angler:AnglerManager){
		this.paralysedFrame++;
		if(this.paralysedFrame>=60)
			this.paralysisRelease(angler);
	}
	

	private paralysisRelease(angler:AnglerManager){
		entityUtil.changeSpriteSurface(angler.body,angler.scene.assets["tsuribito"]);
		angler.setState(new DropState());
		angler.thunder.hide();
		angler.newNeedleFlag = false;
	}
}