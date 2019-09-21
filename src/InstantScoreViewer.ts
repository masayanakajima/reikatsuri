import { MotionLabel } from "./MotionLabel";
import { entityUtil } from "./Util/entityUtil";

export class InstantScoreViewer{

    private pointStack:number[];
    private labelStack:MotionLabel[];
    private DISPLAY_TIME = 2000;
    private displayX = 250;

    constructor(scene:g.Scene){
        this.pointStack = [];
        this.labelStack = [];
        this.labelStack.push(new MotionLabel(entityUtil.createRedLabel(6,{ x: 240, y: 80 },scene)));
        this.labelStack[0].setStartPos(this.displayX,80);
        this.labelStack.push(new MotionLabel(entityUtil.createRedLabel(6,{ x: 240, y: 100 },scene)));
        this.labelStack[1].setStartPos(this.displayX,100);
        this.labelStack.push(new MotionLabel(entityUtil.createRedLabel(6,{ x: 240, y: 100 },scene)));
        this.labelStack[2].setStartPos(this.displayX,100);
        this.labelStack.push(new MotionLabel(entityUtil.createRedLabel(6,{ x: 240, y: 100 },scene)));
        this.labelStack[3].setStartPos(this.displayX,100);
        this.labelStack.push(new MotionLabel(entityUtil.createRedLabel(6,{ x: 240, y: 100 },scene)));
        this.labelStack[4].setStartPos(this.displayX,100);
        for(let i = 0;i<4;i++)
            this.labelStack[i].setNext(this.labelStack[i+1]);

        this.resetLabelPosition();
    }

    public start(){
        
        var i = 0;
        this.pointStack.forEach((point)=>{
            this.labelStack[i].setPoint(point);
            i++;
        });
        this.resetLabelPosition();
        MotionLabel.duration = this.DISPLAY_TIME/Object.keys(this.pointStack).length;
        this.pointStack = [];
        this.labelStack[0].startAnimation();

    }

    public pushNumber(point:number){
        this.pointStack.push(point);
    }

    private resetLabelPosition(){
        this.labelStack.forEach((label)=>{
            label.resetPosition();
        });
    }
    

}