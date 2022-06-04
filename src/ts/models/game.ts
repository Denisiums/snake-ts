export class Game {
    ended = false;
    time: number = 0;
    dt: number = 10; // 10ms

    previousTimeStamp: number = 0;
    accumulator: number = 0;

    constructor() {

    }

    start() {
        this.ended = false;
        this.initialize();

        this.step(0);

    }



    end() {
        // end game loop
        this.ended = true;
    }

    private step(timestamp: number /* time from the start */) {
        console.log('timestamp: ', timestamp);

        if (this.ended) {
            return;
        }

        const frameTime: number = timestamp - this.previousTimeStamp;
        console.log('frameTime: ', frameTime);

        this.accumulator = this.accumulator + frameTime;


        while (this.accumulator >= this.dt) {
            this.updateState(this.time, this.dt);

            this.accumulator -= this.dt;
            this.time += this.dt;
        }





        this.previousTimeStamp = timestamp;
        requestAnimationFrame(this.step.bind(this));
    }

    private updateState(time: number, dt: number) {
        console.log('update state: ', time, dt);
    }

    private initialize() {
        // load resources and create entities


    }


}