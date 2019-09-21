import { ReikaStateBase } from "./ReikaStateBase";
import { ReikaBase, Unti } from "../ReikaBase";
import { SwimState } from "./SwimState";
import { entityUtil } from "../Util/entityUtil";
import { commonDefine } from "../Common/commonDefine";

export class ThrowUntiState extends ReikaStateBase{

    private isThrew:boolean;
    private frame:number;

    constructor(){
        super();
        this.isCatchable = false;
        this.isThrew = false;
        this.frame = 0;
    }

    public doAction(reikaBase:ReikaBase){
        this.frame++;
        this.throwUnti(reikaBase);

        if(this.frame == 90){
            reikaBase.isRight = !reikaBase.isRight;
            reikaBase.scaleX = reikaBase.isRight?-1:1;
            reikaBase.x += reikaBase.isRight ? -50 : +50;
            entityUtil.changeSpriteSurface(reikaBase,reikaBase.scene.assets["untireika"]);
            reikaBase.reikaState = new SwimState();
        }
    }

    private throwUnti(reikaBase:ReikaBase){
        if(this.isThrew) return;
        
        entityUtil.changeSpriteSurface(reikaBase,reikaBase.scene.assets["throwunti"]);
        this.createUnti(reikaBase);
        this.isThrew = true;
    }

    private createUnti(reikaBase:ReikaBase){
        var unti = new Unti(reikaBase.scene,commonDefine.Unti);
        unti.scaleX = reikaBase.isRight?-1:1;
        unti.x = reikaBase.isRight ? reikaBase.x : reikaBase.x + reikaBase.width - unti.width;
        unti.initialY = reikaBase.y;
        unti.y = unti.initialY;
        unti.isRight = reikaBase.isRight;
        entityUtil.appendEntity(unti,reikaBase.scene)
    }
}

export class SwimUntiState extends SwimState{

    constructor(){
        super();
        this.isCatchable = false;
    }
    
    public doAction(reikaBase:ReikaBase){

        super.doAction(reikaBase);

        if(this.getThrowPosition(reikaBase))
            reikaBase.reikaState = new ThrowUntiState();

    }

    private getThrowPosition(reikaBase:ReikaBase):boolean{
        return (!reikaBase.isRight&&reikaBase.x>=-10)||(reikaBase.isRight&&reikaBase.x<=g.game.width-reikaBase.width+10);
    }
}
