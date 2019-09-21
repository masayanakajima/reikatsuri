import { ReikaBase } from "./ReikaBase";
import { FeverManager } from "./GameManager/FeverManager";

export class Needle extends g.Sprite{
    private isEmpty:boolean;
    private isRight:boolean;
    private collisionArea:g.CommonArea;
    private collisionRect:g.E;
   

    public constructor(scene:g.Scene,isRight:boolean,y:number){
        super({scene:scene,
               src:isRight?scene.assets["needle"]:scene.assets["needle2"],
               x:isRight?230+0:230-50,
               y:y
            });
        this.isRight = isRight;
        this.isEmpty = true;
        this.collisionArea = {x:isRight ? this.x+40 : this.x+10,y:this.y+40,width:10,height:10};
        this.collisionRect = new g.E({scene:scene,
                                               x:this.collisionArea.x,
                                               y:this.collisionArea.y,
                                               width:this.collisionArea.width,
                                               height:this.collisionArea.height,
                                               opacity:0});
        scene.append(this.collisionRect);
    }

    public move(distance:number){
        this.y+=distance;
        this.collisionRect.y+=distance;
        
    }

    public searchReika(){
        if(this.isEmpty){
            for(var i = 0;i<this.scene.children.length;i++){
                var currentChild = this.scene.children[i];
                if(currentChild instanceof ReikaBase&&
                  (<ReikaBase>currentChild).isCatchable()&&
                  g.Collision.intersectAreas(this.collisionRect,currentChild))
                    this.catchReika(currentChild);
            }
        }
    }

    private catchReika(reika:ReikaBase){
        if(!this.isEmpty)
            return;

        FeverManager.getInstance().playCatchSE();

        this.isEmpty = false;
        reika.changeCaughtState();
        reika.y = reika.width*0.2;
        if(this.isRight){
            reika.x = this.width - reika.width*0.2;
            reika.angle = 30;
		}
		else{
			reika.x = -reika.width*0.8;
			reika.angle = 330;
        }
        
        this.append(reika);
    }

    public reset(){
        if(!this.isEmpty)
            this.children.forEach((reika)=>{
                reika.destroy();
            });

        this.isEmpty = true;
    }

    public getCaughtReikaName():String{
        if(this.isEmpty)
            return null;

        return (<ReikaBase>this.children[0]).getName();
    }

    public addScoreAndFever(){
        if(!this.isEmpty)
            this.children.forEach((reika)=>{
                (<ReikaBase>reika).plusScoreAndFever();
            });
    }

    get IsEmpty(){
        return this.isEmpty;
    }
}