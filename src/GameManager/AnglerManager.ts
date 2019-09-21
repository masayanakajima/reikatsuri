import { AssetInfo } from "../assetInfo";
import { Needle } from "../Needle";
import { AnglerStateBase } from "../AnglerState/AnglerStateBase";
import { WaitState } from "../AnglerState/WaitState";

export class AnglerManager{
    
    public line:g.Sprite;
	public body:g.Sprite;
	public needleCount:number;
	public needleMax:number;
	public needles:Needle[];
	public needlePosition:number[];
	public scene:g.Scene;
	public newNeedleFlag:boolean;
	public thunder:g.FrameSprite;
	public paralysisSound:g.AudioAsset;
	private state:AnglerStateBase;
	private static angler:AnglerManager;
   
    private constructor(){
        
    }

    public init(scene:g.Scene){
        this.scene = scene;
        this.body = new g.Sprite(AssetInfo.getAnglerProperty(scene));
		this.line = new g.Sprite(AssetInfo.getLineProperty(scene));
		this.thunder = new g.FrameSprite(AssetInfo.getThunderProperty(scene));
		this.paralysisSound = scene.assets["paralysisSound"] as g.AudioAsset
		this.needleCount = 0;
		this.needleMax = 5;
		this.needles = [];
		this.needlePosition = [290,270,250,230,210];
		this.newNeedleFlag = false;
		scene.append(this.thunder);
		this.thunder.start();
		this.thunder.hide();
        scene.append(this.body);
		scene.append(this.line);
		this.addNewNeedle();
		this.addNewNeedle();
		this.state = new WaitState();
	}

    public static getInstance(){
        if(!this.angler)
            this.angler = new this();
        return this.angler;
    }

    public getState():AnglerStateBase{
        return this.state;
    }

    public setState(state:AnglerStateBase){
        this.state = state;
    }

	public AnglerUpdate(){
		this.state.doAction(this);
		this.line.invalidate();
	}

	public moveNeedles(distance:number){
		if(this.needleCount==0)
			return;

		this.needles.forEach((needle)=>{
			needle.move(distance);
		})
	}
	
	public addNewNeedle(){
		if(this.needleCount>=this.needleMax)
			return;

		var newNeedle = new Needle(this.scene,this.needleCount%2==0,this.needlePosition[this.needleCount]);
		this.needles.push(newNeedle);
		this.needleCount++;
		this.scene.append(newNeedle);
	}

	public onClick(){
		this.state.onClick(this);
	}
	
}