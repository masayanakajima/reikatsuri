import { commonDefine } from "../Common/commonDefine";
import { DistributionManager } from "./DistributionManager";

const GAGE_SCALE_TIME = 15;

export class FeverManager{
    private static feverManager:FeverManager;
    private currentFeverPoint:number;
    private readonly maxFeverPoint = 100;
    private feverMode:boolean;
    private gageParent:g.E;
    private gage:g.Sprite;
    private gaging:g.Sprite;
    private initial_gage_length:number;
    private stack:number;
    private plus:number;
    private value:number;
    private bgm:g.AudioAsset;
    private gata:g.AudioAsset;
    private catchSE:g.AudioAsset;
    private catchFeverSE:g.AudioAsset;
    private konoyaro:g.AudioAsset;
    private reppu:g.AudioAsset;

    private constructor(){
       
    }

    public static getInstance():FeverManager{
        if(!this.feverManager)
            this.feverManager = new this();

        return this.feverManager;
    }

    public init(scene:g.Scene){
        this.currentFeverPoint = 0;
        this.stack = 0;
        this.value = 0;
        this.feverMode = false;
        this.gageParent = new g.E({scene:scene,x:280,y:70,width:344,height:42})
        this.gage = new g.Sprite({scene:scene,
                                  src:scene.assets["gage"]});
        this.gaging = new g.Sprite({scene:scene,
                                    src:scene.assets["maxgage"],
                                    x:5,
                                    y:5,
                                    });
        this.gageParent.append(this.gaging);
        this.gageParent.append(this.gage);
        scene.append(this.gageParent);
        this.initial_gage_length = this.gaging.width;
        this.gaging.width = 0;
        this.gaging.invalidate();
        this.bgm = scene.assets["bgm"] as g.AudioAsset;
        this.gata = scene.assets["getreika"] as g.AudioAsset;
        this.konoyaro = scene.assets["konoyaro"] as g.AudioAsset;
        this.reppu = scene.assets["reppu"] as g.AudioAsset;
        this.catchSE = scene.assets["catchSE"] as g.AudioAsset;
        this.catchFeverSE = scene.assets["catchFeverSE"] as g.AudioAsset;
        
    }

    public playCatchSE(){
        this.catchSE.play();
    }

    public playBGM(){
        this.bgm.stop();
        this.bgm.play();
    }

    public stopBGM(){
        this.reppu.stop();
        this.bgm.stop();
    }

    private playGetReikaSE(){
        if(!this.feverMode){
            if(this.gata.inUse()){
                this.gata.stop();
                this.gata.play();
            }else
                this.gata.play();
        }else{
            if(this.catchFeverSE.inUse()){
                this.catchFeverSE.stop();
                this.catchFeverSE.play();
            }else
                this.catchFeverSE.play();
        }

    }

    public plusFeverGage(point:number){
        this.playGetReikaSE();

        this.startPlus(this.feverMode?point/3:point);
        
        if(this.currentFeverPoint >= this.maxFeverPoint){
            this.currentFeverPoint = this.maxFeverPoint;
            if(!this.feverMode)
                this.startFeverMode();
        }
    }

    public minusFeverGage(){
        this.startPlus(-(this.feverMode?4:1));
        if(this.currentFeverPoint<0){
            this.currentFeverPoint = 0;
            if(this.feverMode)
                this.finishFeverMode();
        }
    }

    private startFeverMode(){
        this.feverMode = true;
        this.bgm.stop();
        this.konoyaro.play();
        this.reppu.play();
    }

    private finishFeverMode(){
        this.feverMode = false;
        this.reppu.stop();
        this.bgm.play();
    }


    public isFeverMode():boolean{
        return this.feverMode;
    }

    public gageUpdate(){

        const feverrate = this.value/this.maxFeverPoint;
        this.gaging.width = this.initial_gage_length*feverrate;
        this.gaging.invalidate();

        this.animePlusGage();
		if (this.value < 0) {
			this.value = 0;
			this.stack = 0;
		} else if (this.value > this.maxFeverPoint) {
			this.value = this.maxFeverPoint;
			this.stack = 0;
		}
        
    }
    /**
	 * スタックスコアからのマージスコアを一気に足す
	 */
	mergeScore(): void {
		this.value += this.stack;
		this.stack = 0;
	}

	/**
	 * スコア加算開始
	 * @param {number} _plusScore 加算対象スコア
	 */
	startPlus(_plusScore: number): void {
		this.setStack(_plusScore);
        this.setPlus();
        this.currentFeverPoint+=_plusScore;
	}
	
	/**
	 * スコアをすこしずつ足す
	 */
	private animePlusGage(): void {
		if ((this.stack > 0 && this.stack >= this.plus)||(this.stack<0&&this.stack<=this.plus)){
			this.value += this.plus;
			this.stack -= this.plus;
		}else{
            this.mergeScore();
        }
	}

	/**
	 * 加算幅をスタックスコアから設定
	 */
	private setPlus(): void {
		// ラベル強調時間で終わるように
		this.plus = this.stack / GAGE_SCALE_TIME;
	}

	/**
	 * スコアを演出用にスタック
	 * @param {number} _plusScore 加算対象スコア
	 */
	private setStack(_plusScore: number): void {
		this.stack += _plusScore;
    }
    
    public FeverMagnitudedParameter(parameter:number):number{
        return this.feverMode ? parameter*commonDefine.FEVER_MAGNIFICATION : parameter; 
    }
}