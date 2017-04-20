class Character extends engine.DisplayObjectContainer {

    static chara:Character;
    private callback:Function;
    _main: engine.DisplayObjectContainer;
    _stateMachine: StateMachine;
    _body: engine.Bitmap;
    _ifidle: boolean;
    _ifmove: boolean;
    _idleState: CharacterIdleState = new CharacterIdleState(this);
    _moveState: CharacterMoveState = new CharacterMoveState(this);

    // private timer:egret.Timer;

    constructor(main:engine.DisplayObjectContainer) {
        super();
        this._main = main;
        this._body = new engine.Bitmap;
        this._body.img.src = "resource/assets/chara/chara1.png";
        this._main.addChild(this._body);
        this._body.width = 50;
        this._body.height = 50;
        // this._body.anchorOffsetX = this._body.width * 0.5;
        // console.log("anchorx :" + this._body.anchorOffsetX);
        // this._body.anchorOffsetY = this._body.height * 0;
        this._stateMachine = new StateMachine();
        this._body.x = 0
        this._body.y = 100
        console.log(this._body.x);
        this._ifidle = true;
        this._ifmove = false;
    }

    /*public static setChara(chara:Character){
        this.chara = chara;
    }

    public static getChara():Character{
        return this.chara;
    }*/

    public commandMove(x:number,y:number,path:Point[],callback:Function){
        console.log("开始移动");
        this.move(x,y,path);
        this.callback = callback;
        //console.log(callback);
    }

    public commandStop(){
        // egret.Tween.removeTweens(this._body);
        // if (this.timer != null) {
        //     this.timer.stop();
        // }
        this.idle();
        
    }

    public move(targetX: number, targetY: number, path: Point[]) {

        // //中止缓动动画，达到实现运动中更换目标点的目的
        // egret.Tween.removeTweens(this._body);
        // if (this.timer != null) {
        //     this.timer.stop();
        // }


        //触发状态机
        this._stateMachine.setState(this._moveState);

        //如果状态机将_ifwalk变量调整为true,则进入运动状态
        if (this._ifmove) {
            console.log("move");
            // if (targetX > this._body.x) {
            //     this._body.skewY = 0;
            // }
            // else {
            //     this._body.skewY = 180;
            // }
            this.startMove();

            //用Timer来实现固定间隔顺序读取路径数组中的点并移动
            // var interval:number = 250;
            // this.timer = new engine.Timer(interval, path.length - 1,0);

            // this.timer.addEventListener(engine.TimerEvent.TIMER, function (e: egret.TimerEvent): void {
            //     egret.Tween.get(this._body).to({ x: (path[this.timer.currentCount].x + 1) * 50 - 25, y: (path[this.timer.currentCount].y) * 50 }, interval);
            //     console.log("target:" + path[this.timer.currentCount - 1].x + " , " + path[this.timer.currentCount - 1].y);
            // }, this);

            // this.timer.addEventListener(engine.TimerEvent.TIMER_COMPLETE, function (e: egret.TimerEvent): void {
            //     this.idle();
            //     this.callback();
            // }, this);

            // this.timer.start();
            // console.log(path.length);

            if (path.length != 0) {
                var counter = 0;
                var id = setInterval(() => {
                    this._body.x = (path[counter].x) * 100;
                    this._body.y = (path[counter].y) * 100;
                    counter++;
                    if (counter == path.length) {
                    clearInterval(id);
                }
                }, 500);
            }
        }
    }


    public idle() {

        this._stateMachine.setState(this._idleState);

        //如果状态机将_ifidle变量调整为true,则进入停止状态
        if (this._ifidle) {
            console.log("idle");
            this.startidle();
        }
    }

    //播放运动动画
    public startMove() {
        var list = ["resource/assets/chara/chara1.png", 
                    "resource/assets/chara/chara2.png", 
                    "resource/assets/chara/chara3.png"];
        var count = 0;
        //this._body.texture = RES.getRes("3_png");
        //循环执行
        engine.Ticker.getInstance().register(() => {

            if (this._ifmove) {
                count　+= 0.2;
                if (count >= list.length) {
                    count = 0;
                    console.log("chara pos: ("+ this._body.x + " , " + this._body.y + ")");
                }

                this._body.img.src = list[Math.floor(count)];
            }

        });

    }

    public startidle() {

        this._body.img.src = "resource/assets/chara/chara1.png";

    }

}