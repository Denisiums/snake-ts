import {Snake} from './snake';
import {Field} from './field';
import {Coordinate} from './coordinate';
import {Game} from './game';
import {Renderer} from '../utils/renderer';
import {CanvasRenderer} from '../utils/canvasRenderer';
import {KEY_CODES, SIZE_X, SIZE_Y} from './constants';

export class GameLoop {
    ended = false;
    time: number = 0;
    dt: number = 10; // 10ms

    previousTimeStamp: number = 0;
    accumulator: number = 0;

    game: Game | null = null;
    renderer: Renderer | null = null;

    objects = []; // with methods update and draw? Or just field and it cares about the rest?

    private animationFrame: any;

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
        console.log('end of game loop');
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    private step(timestamp: number /* time from the start */) {
        // console.log('timestamp: ', timestamp);

        if (this.ended) {
            return;
        }

        const frameTime: number = timestamp - this.previousTimeStamp;
        // console.log('frameTime: ', frameTime);

        this.accumulator = this.accumulator + frameTime;


        // calculating physics
        while (this.accumulator >= this.dt) {
            this.updateState(this.dt, this.time);

            this.accumulator -= this.dt;
            this.time += this.dt;
        }

        this.draw();

        this.previousTimeStamp = timestamp;
        this.animationFrame = requestAnimationFrame(this.step.bind(this));
    }

    private updateState(dt: number, time: number) {
        // console.log('update state: ', dt, time);
        // pass data to every object (time and dt, I guess)
        // Game knows which object it has
        // (we are in Game)
        if (this.game?.finished) {
            this.end();
            return;
        }

        this.game?.update(dt, time);
    }

    private draw(): void {
        if (!this.renderer) {
            console.log('no renderer!');
            return;
        }

        this.game?.draw(this.renderer);
    }

    private initialize() {
        // load resources and create entities
        this.renderer = new CanvasRenderer(SIZE_X, SIZE_Y);
        this.game = new Game(SIZE_X, SIZE_Y);

        console.log('game:', this.game);
        (window as any).game = this.game;
        this.bindControls();
    }

    // todo: unbind controls on exit
    private bindControls(): void {
        document.addEventListener('keydown', this.onKeyPress.bind(this)); // arrows
    }

    private onKeyPress(event: KeyboardEvent) {
        this.game?.handleControl(event.keyCode as KEY_CODES);
    }
}