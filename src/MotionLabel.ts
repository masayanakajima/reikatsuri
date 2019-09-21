import * as tl from "@akashic-extension/akashic-timeline";
import { entityUtil } from "./Util/entityUtil";

export class MotionLabel{

    private destX:number;
    private destY:number;
    public static duration:number;
    private startPosX:number;
    private startPosY:number;
    private next:MotionLabel;
    private timeline:tl.Timeline;
    private label:g.Label;
    private isEnable:boolean;
    private point:number;

    constructor(label:g.Label){
        this.label = label;
        this.next = null;
        this.timeline = new tl.Timeline(this.label.scene);
        this.isEnable = false;
        this.startPosX = label.x;
        this.startPosY = label.y;
    }

    public setStartPos(x:number,y:number){
        this.startPosX = x;
        this.startPosY = y;
        this.resetPosition();
    }

    public IsEnable(){
        return this.isEnable;
    }

    public setNext(next:MotionLabel){
        this.next = next;
    }

    public setPoint(point:number){
        this.point = point;
        entityUtil.setLabelText(this.label,"+"+this.point.toString());
        this.isEnable = true;
    }

    public startAnimation(){
        if(!this.IsEnable())
            return;

        this.label.show();
        this.timeline.clear();
        const tween:tl.Tween = this.timeline.create(
            this.label,
            {
                modified:this.label.invalidate,
                destroyed:this.label.destroyed
            }
        );

        tween.fadeIn(MotionLabel.duration/4);
        tween.con();
        tween.moveTo(this.destX,this.destY,MotionLabel.duration/4);

        tween.to({scaleX:1.2,scaleY:1.2},MotionLabel.duration/4);
        

        tween.call(()=>{
            if(this.next == null)
                return;
            this.next.startAnimation();
        });

        tween.to({scaleX:1.0,scaleY:1.0},MotionLabel.duration/3);
        tween.con();
        tween.fadeOut(MotionLabel.duration/3);
        this.isEnable = false;
    }

    public resetPosition(){
        this.label.x = this.getX();
        this.label.y = this.startPosY;
        this.destX = this.label.x;
        this.destY = 70;
        this.label.hide();
        this.label.invalidate();
    }

    private getX():number{
        if(this.point<1000)
            return this.startPosX-60;
        else if(this.point<10000)
            return this.startPosX -30;
        else
            return this.startPosX;
    }

}