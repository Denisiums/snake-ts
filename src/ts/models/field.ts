import {Coordinate} from './coordinate';
import {getRandomWithinRange} from '../utils/helpers';

export class Field {

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
}