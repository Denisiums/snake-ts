import {GameObject} from './gameObject';
import {Snake} from './snake';
import {Coordinate} from './coordinate';
import {Field} from './field';
import {Food} from './food';

const INITIAL_SNAKE_LENGTH = 4;

// it will know all objects and operate them
export class Game implements GameObject {
    finished: boolean = false;
    snake: Snake;
    field: Field;
    food: Food;

    private sizeX: number;
    private sizeY: number;

    constructor(sizeX: number, sizeY: number) {
        if (sizeX < INITIAL_SNAKE_LENGTH * 2 || sizeY < INITIAL_SNAKE_LENGTH) {
            throw new Error('The field is too small');
        }

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.field = new Field(sizeX, sizeY);
        const centerX = Math.floor(sizeX / 2);
        const centerY = Math.floor(sizeY / 2);
        this.snake = new Snake(new Coordinate(centerX, centerY), INITIAL_SNAKE_LENGTH);
        const emptyCoordinate = this.getRandomEmptyCoordinate();
        if (!emptyCoordinate) {
            throw new Error('Not found empty coordinate to place food at the start of the game!');
        }
        this.food = this.createFood(emptyCoordinate);

    }

    update(dt: number, time?: number): void {

    }

    draw(): void {

    }

    private createFood(coordinate: Coordinate): Food {
        return new Food(coordinate);
    }

    private getRandomEmptyCoordinate(): Coordinate | null {
        // check if it's empty
        // if not - reroll and repeat.
        // if a snake takes the whole field - win
        if (this.isSnakeCoversField()) {
            return null;
        }

        let randomFieldCoordinate = this.field.getRandomCoordinate();
        while (!this.isCoordinateEmpty(randomFieldCoordinate)) {
            randomFieldCoordinate = this.field.getRandomCoordinate();
            console.log('looking for empty coordinate... ', randomFieldCoordinate);
        }

        return randomFieldCoordinate;
    }

    private win(): void {
        this.finished = true;
        alert('You won!');
    }

    private isSnakeCoversField(): boolean {
        const fieldSize = (this.sizeX + 1) * (this.sizeY + 1);
        const snakeLength = this.snake.getCoordinates().length - 1; // 1 free space
        return snakeLength >= fieldSize;
    }

    private isCoordinateEmpty(coordinate: Coordinate): boolean {
        const snakeCoordinates = this.snake.getCoordinates();
        const foodCoordinate = this.food.coordinate;

        if (foodCoordinate.isSame(coordinate)) {
            return false;
        }

        return !snakeCoordinates.some(segmentCoordinate => {
            segmentCoordinate.isSame(coordinate)
        });

    }

    private eatFood(): void {
        this.snake.grow();
        const emptyCoordinate = this.getRandomEmptyCoordinate();
        if (!emptyCoordinate) {
            this.win();
            return;
        }
        this.food = this.createFood(emptyCoordinate);
    }




}