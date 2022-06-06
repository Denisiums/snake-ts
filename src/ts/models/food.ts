import {Coordinate} from './coordinate';
import {GameObject} from './gameObject';

export class Food implements GameObject {
    coordinate: Coordinate;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
    }

    update(dt: number) {

    }

    draw() {

    }
}