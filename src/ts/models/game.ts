export class Game {
    ended = false;
    previousTimeStamp: number = 0;

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

    private step(timestamp: number) {
        console.log('timestamp: ', timestamp);

        if (this.ended) {
            return;
        }




        requestAnimationFrame(this.step.bind(this));
    }

    private initialize() {
        // load resources and create entities


    }


}