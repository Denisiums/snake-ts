import {Coordinate} from './coordinate';
import {GameObject} from './gameObject';
import {Renderer} from '../utils/renderer';

export class Food implements GameObject {
    coordinate: Coordinate;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
    }

    update(dt: number) {

    }

    draw(renderer: Renderer) {
        renderer.drawFood(this);
    }
}