import { SceneBase } from "./SceneBase";

export class DescriptionScene extends SceneBase{

    private title:g.Sprite;
    private frameCnt:number;

    constructor(property:any){
        super(property);
    }

    protected loadedHandler():()=>void{
        return ()=>{
            this.title = new g.Sprite({scene:this,src:this.assets["title"]});
            this.append(this.title);
            this.frameCnt = 0;
        };
    }

    protected updateHandler():()=>void{
        return ()=>{
            this.frameCnt++;
            if(this.frameCnt>=g.game.fps*5)
                this.requestedNextScene.fire();
        };
    }

    protected timeoutHandler():()=>void{
        return ()=>{

        };
    }
}