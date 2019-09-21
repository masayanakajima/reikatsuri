export abstract class SceneBase extends g.Scene{
    public requestedNextScene:g.Trigger<void>;

    constructor(property:any){
        super(property);
    }

    public init(nextScene?:SceneBase){
        this.loaded.handle(()=>{
            this.setNextScene(nextScene);
            this.loadedHandler()();
            this.update.handle(this.updateHandler());
        });
    };

    private setNextScene(nextScene?:SceneBase){
        this.requestedNextScene = new g.Trigger<void>();
        this.requestedNextScene.handle(()=>{
            this.destroy();
            if(!nextScene)
                return;
            g.game.pushScene(nextScene);
        });
    }

    protected abstract timeoutHandler():()=>void;
    protected abstract loadedHandler():()=>void;
    protected abstract updateHandler():()=>void;
}
