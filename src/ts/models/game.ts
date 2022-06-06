import {GameObject} from './gameObject';
import {Snake} from './snake';
import {Coordinate} from './coordinate';
import {Field} from './field';
import {Food} from './food';
import {Renderer} from '../utils/renderer';
import {DIRECTION, KEY_CODES} from './constants';

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
        // check if snake head of the food - eat it
        if (this.isSnakeOnFood()) {
            this.eatFood();
        }

        this.field.update(dt);
        this.food.update(dt);
        this.snake.update(dt);

        if (this.isSnakeCrashed()) {
            this.onCrash();
        }

        // check if snake crashed (on the field or by herself)

    }

    draw(renderer: Renderer): void {
        renderer.clear();
        this.field.draw(renderer);
        this.food.draw(renderer);
        this.snake.draw(renderer);
    }

    handleControl(keyCode: KEY_CODES) {
        switch(keyCode) {
            case KEY_CODES.ARROW_LEFT:
                this.snake.changeDirectionTo(DIRECTION.LEFT)
                break;
            case KEY_CODES.ARROW_UP:
                this.snake.changeDirectionTo(DIRECTION.UP)
                break;
            case KEY_CODES.ARROW_RIGHT:
                this.snake.changeDirectionTo(DIRECTION.RIGHT)
                break;
            case KEY_CODES.ARROW_DOWN:
                this.snake.changeDirectionTo(DIRECTION.DOWN)
                break;
            default:
                // do nothing
        }
            
    }

    private createFood(coordinate: Coordinate): Food {
        return new Food(coordinate);
    }

    // todo: need to test this method
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
        }

        return randomFieldCoordinate;
    }

    private isSnakeOnFood(): boolean {
        return this.snake.getHeadCoordinate().isSame(this.food.coordinate);
    }

    private isSnakeCrashed(): boolean {
        const outsideOfBorders = this.field.isOutsideOfBorders(this.snake.getHeadCoordinate());
        return outsideOfBorders || this.snake.isCrashed();
    }

    private onCrash(): void {
        this.finished = true;
        console.log('You lose');
    }

    private win(): void {
        this.finished = true;
        console.log('You won!');
    }

    private isSnakeCoversField(): boolean {
        const fieldSize = (this.sizeX + 1) * (this.sizeY + 1);
        const snakeLength = this.snake.getCoordinates().length - 1; // 1 free space
        return snakeLength >= fieldSize;
    }

    private isCoordinateEmpty(coordinate: Coordinate): boolean {
        const snakeCoordinates = this.snake.getCoordinates();
        if (this.food && this.food.coordinate && this.food.coordinate.isSame(coordinate)) {
            return false;
        }

        return !snakeCoordinates.some(segmentCoordinate => {
            return segmentCoordinate.isSame(coordinate);
        });

    }

    private eatFood(): void {
        this.snake.grow();
        this.createFoodSomewhere();
    }

    private createFoodSomewhere(): void {
        const emptyCoordinate = this.getRandomEmptyCoordinate();
        if (!emptyCoordinate) {
            this.win();
            return;
        }
        this.food = this.createFood(emptyCoordinate);
    }




}