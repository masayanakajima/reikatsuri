import { SceneBase } from "./SceneBase";
import { FeverManager } from "./GameManager/FeverManager";
import { TimeManager } from "./GameManager/TimeManager";
import { ScoreManager } from "./GameManager/ScoreManager";
import { AnglerManager } from "./GameManager/AnglerManager";
import { AssetInfo } from "./assetInfo";

export class GameScene extends SceneBase{

    private wave:g.FrameSprite;
    private sun:g.FrameSprite;
    public alertBG:g.Sprite;
    public static random:g.XorshiftRandomGenerator;

    constructor(property:any){
        super(property);
    }

    public static getRandom(min:number,max:number){
        if(this.random==null)
            this.random = new g.XorshiftRandomGenerator(new Date().getSeconds());
        return this.random.get(min,max);
    }

    protected loadedHandler():()=>void{
        return ()=>{
            g.game.vars.gameState = {score:0};

            const bg = new g.FilledRect({ scene: this, width: 640, height: 360, cssColor: "#aaccff" ,opacity:0.4});
            this.append(bg);
            
            this.alertBG = new g.Sprite({scene:this,src:this.assets["alertBG"],x:0,y:0,opacity:0});
            this.append(this.alertBG);
            
            FeverManager.getInstance().init(this);
            ScoreManager.getInstance().init(this);
            TimeManager.getInstance().init(this);
            AnglerManager.getInstance().init(this);

            this.wave = new g.FrameSprite(AssetInfo.getWaveProperty(this));
            this.append(this.wave);
            this.wave.start(); 

            this.sun = new g.FrameSprite(AssetInfo.getSunProperty(this));
            this.append(this.sun);
            this.sun.start();
            
            this.pointDownCapture.handle(()=>{
                AnglerManager.getInstance().onClick();
            });
        };
    }

    protected updateHandler():()=>void{
        return ()=>{
             TimeManager.getInstance().updateTime();
        };
    }

    protected timeoutHandler():()=>void{
        return ()=>{

        };
    }

    public destroy(){
        FeverManager.getInstance().stopBGM();
        super.destroy();
    }
}
