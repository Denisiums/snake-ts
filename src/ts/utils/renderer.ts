import {Snake} from '../models/snake';
import {Food} from '../models/food';
import {Field} from '../models/field';

export abstract class Renderer {
    abstract renderSnake(snake: Snake): void;

    abstract renderFood(food: Food): void;

    abstract renderField(field: Field): void;
}