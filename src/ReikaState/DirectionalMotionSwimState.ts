import { SwimState } from "./SwimState";
import { ReikaBase } from "../ReikaBase";
import { GameScene } from "../GameScene";

enum State{SWIM,TURN};

export class DirectionalMotionSwimState extends SwimState{

    private animationFinished:boolean;
    private state:State;

    constructor(){
        super();
        this.state = State.SWIM;
    }
    
    public doAction(reikaBase:ReikaBase){

        switch(this.state){
            case State.SWIM:

                if(reikaBase.frame%30==0&&GameScene.getRandom(0,10)==0)
                    this.changeDirection(reikaBase);
            break;
            case State.TURN:
                if(reikaBase.frameNumber == 3)
                    this.animationFinished = true;

                if(reikaBase.frameNumber == 0&&this.animationFinished){
                    reikaBase.scaleX = reikaBase.isRight?1:-1;
                    reikaBase.stop();
                    reikaBase.frames = [0,1,2,3];
                    reikaBase.interval = 300;
                    reikaBase.modified();
                    reikaBase.start();
                    this.state = State.SWIM;                 
                }
                     
            break;
        }
        
        super.doAction(reikaBase);
	}

	protected changeDirection(reikaBase:ReikaBase){
        reikaBase.interval = 100;
        reikaBase.frames = [4,5,6,7];
        reikaBase.modified();
		reikaBase.start();
        reikaBase.isRight = !reikaBase.isRight;
        this.state = State.TURN;
        this.animationFinished = false;
	}
}