import { SceneBase } from "./SceneBase";
import { entityUtil } from "./Util/entityUtil";

export class ResultScene extends SceneBase{

    private resultLabel:g.Label;
    private resultBoard:g.Sprite;
    private isRolling:boolean;
    private frame:number;

    constructor(property:any){
        super(property);
        this.frame = 0;
    }

    protected updateHandler():()=>void{
        return ()=>{
            this.frame++;
            if(this.frame==2*g.game.fps){
                this.timeoutHandler()();
            }else{
                let value  = g.game.vars.gameState.score;
                const len = String(value).length;
                if(this.isRolling){
                    value = this.game.random[0].get(
                            Math.pow(10, len - 1),
                            Math.pow(10, len) - 1);
                }
                entityUtil.setLabelText(this.resultLabel,String(value));
            }
        };
    }

    protected loadedHandler():()=>void{
        return ()=>{
            this.resultBoard = new g.Sprite({scene:this,src:this.assets["result_board"],x:95,y:100,scaleX:1.4,scaleY:1.4});
            entityUtil.appendEntity(this.resultBoard,this);
            this.resultLabel = entityUtil.createResultLabel(6,{x:415,y:200},this);
            this.isRolling = true;
            (this.assets["se_No8_RollCount2"] as g.AudioAsset).play();
        };
    }

    protected timeoutHandler():()=>void{
        return ()=>{
            this.isRolling = false;
            (this.assets["se_No8_RollCount2"] as g.AudioAsset).stop();
            (this.assets["se_No8_RollCount_Finish"] as g.AudioAsset).play();
        }
    }
}