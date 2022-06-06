import {Renderer} from './renderer';
import {Snake} from '../models/snake';
import {Food} from '../models/food';
import {Field} from '../models/field';

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;

export class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null = null;

    constructor(sizeX: number, sizeY: number) {
        super();

        const canvas = document.createElement('canvas');
        canvas.width = sizeX * CELL_WIDTH;
        canvas.height = sizeY * CELL_HEIGHT;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    renderSnake(snake: Snake) {
        console.log('render snake');
    }

    renderFood(food: Food) {

    }

    renderField(field: Field) {

    }

}