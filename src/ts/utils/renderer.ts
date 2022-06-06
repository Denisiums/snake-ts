import {Snake} from '../models/snake';
import {Food} from '../models/food';
import {Field} from '../models/field';

export abstract class Renderer {
    abstract drawSnake(snake: Snake): void;

    abstract drawFood(food: Food): void;

    abstract drawField(field: Field): void;

    abstract clear(): void;
}