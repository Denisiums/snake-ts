import {Renderer} from './renderer';
import {Snake} from '../models/snake';
import {Food} from '../models/food';
import {Field} from '../models/field';
import {Coordinate} from '../models/coordinate';
import {COLOR} from '../models/constants';

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;
// const BORDER_WIDTH = 5;

export class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null = null;
    canvasWidth: number;
    canvasHeight: number;

    constructor(sizeX: number, sizeY: number) {
        super();

        const canvas = document.createElement('canvas');
        this.canvasWidth = sizeX * CELL_WIDTH;
        canvas.width = this.canvasWidth;
        this.canvasHeight = sizeY * CELL_HEIGHT;
        canvas.height = this.canvasHeight;
        canvas.id = 'canvas';
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    drawSnake(snake: Snake) {
        this.renderCell(snake.getHeadCoordinate(), COLOR.HEAD);
        snake.getTailCoordinates().forEach(coordinate => {
            this.renderCell(coordinate, COLOR.WHITE);
        });
    }

    drawFood(food: Food) {
        this.renderCell(food.coordinate, COLOR.FOOD);
    }

    drawField(field: Field) {
        // lines?
    }

    clear() {
        this.context!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    private renderCell(coordinate: Coordinate, color?: COLOR | string): void {
        if (!this.context) {
            return;
        }

        this.context.fillStyle = COLOR.BLACK;
        const x = this.getCoordinateCanvasX(coordinate);
        const y = this.getCoordinateCanvasY(coordinate);
        this.context?.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        this.context.fillStyle = color || COLOR.WHITE;
        this.context?.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        this.context.fillStyle = COLOR.BLACK;
    }

    private getCoordinateCanvasX(coordinate: Coordinate): number {
        return coordinate.x * CELL_WIDTH;
    }

    private getCoordinateCanvasY(coordinate: Coordinate): number {
        return coordinate.y * CELL_HEIGHT;
    }


}