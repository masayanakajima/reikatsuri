import { ReikaBase, GataReika, NormalReika, NemuReika, TakoReika, YuReika, YuiZarashi, UntiReika } from "../ReikaBase";
import { ReikaInfo } from "../Common/commonType";
import { commonDefine } from "../Common/commonDefine";
import { DistributionManager } from "./DistributionManager";
import { GameScene } from "../GameScene";

export class ReikaManager{
    private static reikaManager:ReikaManager;
    private reikas:Array<ReikaBase>;

    private constructor(){
        this.reikas = new Array<ReikaBase>();
    }

    public static getInstance(){
        if(!this.reikaManager)
            this.reikaManager = new this();
        return this.reikaManager;
    }

    public registerReika(reika:ReikaBase){
        this.reikas.push(reika);
    }

    public unregisterReika(reika:ReikaBase){
        const index = this.reikas.indexOf(reika);
        this.reikas.splice(index,1);
    }

    public update(){
        this.reikas.forEach((reika)=>{
            reika.move();
        });
    }

    private createReika(reikaInfo:ReikaInfo,scene:g.Scene):ReikaBase{
        var reika = this.getReikaFromName(scene,reikaInfo);
        var random:number = GameScene.getRandom(0,commonDefine.SPAWN_RIGHT_ARRAY.length-1);
        var isRight:boolean = GameScene.getRandom(0,1)==0;
		reika.InitializePosition(isRight,random);
        return reika;
    }

    public getReikaFromName(scene:g.Scene,reikaInfo:ReikaInfo):ReikaBase{
        var reika:ReikaBase;
        switch(reikaInfo.swim_src){
            case "gatareika":
                reika = new GataReika(scene,reikaInfo);
            break;
            case "normal":
                reika = new NormalReika(scene,reikaInfo);
            break;
            case "nemureika":
                reika = new NemuReika(scene,reikaInfo);
            break;
            case "takoreika":
                reika = new TakoReika(scene,reikaInfo);
            break;
            case "yureika":
                reika = new YuReika(scene,reikaInfo);
            break;
            case "yuizarashi2":
                reika = new YuiZarashi(scene,reikaInfo);
            break;
            case "untireika":
                reika = new UntiReika(scene,reikaInfo);
            break;
            default:
                reika = new ReikaBase(scene,reikaInfo);
            break;
        }
        return reika;
    }

    public spawn(scene:g.Scene){
        if(Object.keys(this.reikas).length>commonDefine.MAX_REIKA_POOL)
            return;

		const random = GameScene.getRandom(0,99);
		const reikaInfo = DistributionManager.getInstance().getReikaInfo(random);
        var reika:ReikaBase = this.createReika(reikaInfo,scene);
        scene.append(reika);
	}
}