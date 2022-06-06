import {Coordinate} from './coordinate';
import {getRandomWithinRange} from '../utils/helpers';
import {GameObject} from './gameObject';
import {Renderer} from '../utils/renderer';

export class Field implements GameObject{

    private sizeX: number;
    private sizeY: number;

    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    // this is not effective in case of lack of empty fields;
    // todo: need to rewrite to know which coordinates are empty and which are not (for performance)
    getRandomCoordinate(): Coordinate {
        const x = getRandomWithinRange(0, this.sizeX);
        const y = getRandomWithinRange(0, this.sizeY);
        return new Coordinate(x, y);
    }

    isOutsideOfBorders(coordinate: Coordinate): boolean {
        const x = coordinate.x;
        const y = coordinate.y;
        return x > this.sizeX
            || x < 0
            || y > this.sizeY
            || y < 0;
    }

    update(dt: number, time?: number) {

    }

    draw(renderer: Renderer) {
        renderer.drawField(this);
    }
}