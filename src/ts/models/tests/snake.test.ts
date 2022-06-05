import {Snake} from '../snake';
import {Coordinate} from '../coordinate';
import {DIRECTION} from '../constants';

describe('Snake', () => {

    describe('Snake creation', () => {
        let snake: Snake;
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;
        let expectedCoordinates: Coordinate[] = [
            baseCoordinate,
            new Coordinate(11, 20),
            new Coordinate(12, 20),
            new Coordinate(13, 20),
        ];


        beforeEach(() => {
            snake = new Snake(baseCoordinate, baseLength);
        });

        test('Has proper length', () => {
            expect(snake.getLength()).toBe(4);
        });

        test('Has proper length of 100', () => {
            snake = new Snake(baseCoordinate, 100);
            expect(snake.getLength()).toBe(100);
        });

        test('Has proper length 1', () => {
            snake = new Snake(baseCoordinate, 1);
            expect(snake.getLength()).toBe(1);
        });

        test('Has proper coordinates', () => {
            const coordinates: Coordinate[] = snake.getCoordinates();
            expect(coordinates).toMatchObject(expectedCoordinates);
        });
    });

    describe('Snake changes direction', () => {
        let snake: Snake;
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;
        let expectedCoordinates: Coordinate[] = [
            baseCoordinate,
            new Coordinate(11, 20),
            new Coordinate(12, 20),
            new Coordinate(13, 20),
        ];

        beforeEach(() => {
            snake = new Snake(baseCoordinate, baseLength);
        });

        test('Has correct default direction', () => {
            expect(snake.getDirection()).toBe(DIRECTION.LEFT);
        });

        test('From left to left with tail', () => {
            snake.changeDirectionTo(DIRECTION.LEFT);
            expect(snake.getDirection()).toBe(DIRECTION.LEFT);
        });

        test('From left to top with tail', () => {
            snake.changeDirectionTo(DIRECTION.TOP);
            expect(snake.getDirection()).toBe(DIRECTION.TOP);
        });

        test('From left to bottom with tail', () => {
            snake.changeDirectionTo(DIRECTION.BOTTOM);
            expect(snake.getDirection()).toBe(DIRECTION.BOTTOM);
        });

        test('From left to right with tail at right', () => {
            snake.changeDirectionTo(DIRECTION.RIGHT);
            expect(snake.getDirection()).toBe(DIRECTION.LEFT);
        });

    })

});