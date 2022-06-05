import {Snake} from './snake';
import {Field} from './field';
import {Coordinate} from './coordinate';

export class Game {
    ended = false;
    time: number = 0;
    dt: number = 10; // 10ms

    previousTimeStamp: number = 0;
    accumulator: number = 0;

    objects = []; // with methods update and draw? Or just field and it cares about the rest?

    // we have not so many objects, so we can have a single array with them
    // if we have many, we can update them separately

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
        // console.log('timestamp: ', timestamp);

        if (this.ended) {
            return;
        }

        const frameTime: number = timestamp - this.previousTimeStamp;
        // console.log('frameTime: ', frameTime);

        this.accumulator = this.accumulator + frameTime;


        while (this.accumulator >= this.dt) {
            this.updateState(this.dt, this.time);

            this.accumulator -= this.dt;
            this.time += this.dt;
        }

        this.previousTimeStamp = timestamp;
        requestAnimationFrame(this.step.bind(this));
    }

    private updateState(dt: number, time: number) {
        // console.log('update state: ', dt, time);
        // pass data to every object (time and dt, I guess)
        // Game knows which object it has
        // (we are in Game)

    }

    private initialize() {
        // load resources and create entities
        const snake = new Snake(new Coordinate(30, 30), 4);
        console.log('snake:', snake);
        (window as any).snake = snake;

    }


}