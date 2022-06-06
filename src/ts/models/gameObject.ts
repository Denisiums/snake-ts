import {Renderer} from '../utils/renderer';

export interface GameObject {
    draw(renderer: Renderer): void;
    update(dt: number, time?: number): void;
}