import {Snake} from '../snake';
import {Coordinate} from '../coordinate';
import {DIRECTION, TIME_TO_MOVE} from '../constants';

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

    describe('Snake changes direction with length 4', () => {
        let snake: Snake;
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;

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
            snake.changeDirectionTo(DIRECTION.UP);
            expect(snake.getDirection()).toBe(DIRECTION.UP);
        });

        test('From left to bottom with tail', () => {
            snake.changeDirectionTo(DIRECTION.DOWN);
            expect(snake.getDirection()).toBe(DIRECTION.DOWN);
        });

        test('From left to right with tail at right', () => {
            snake.changeDirectionTo(DIRECTION.RIGHT);
            expect(snake.getDirection()).toBe(DIRECTION.LEFT);
        });

    });

    describe('Snake changes direction without tail', () => {
        let snake: Snake;
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 1;

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
            snake.changeDirectionTo(DIRECTION.UP);
            expect(snake.getDirection()).toBe(DIRECTION.UP);
        });

        test('From left to bottom with tail', () => {
            snake.changeDirectionTo(DIRECTION.DOWN);
            expect(snake.getDirection()).toBe(DIRECTION.DOWN);
        });

        test('From left to right with tail at right', () => {
            snake.changeDirectionTo(DIRECTION.RIGHT);
            expect(snake.getDirection()).toBe(DIRECTION.RIGHT);
        });
    });

    describe('Moves with length 4', () => {
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;

        test('Moves left', () => {
            let snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.changeDirectionTo(DIRECTION.LEFT);

            let expectedNewCoordinates: Coordinate[] = [
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            expectedNewCoordinates = [
                new Coordinate(8, 20),
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            expectedNewCoordinates = [
                new Coordinate(7, 20),
                new Coordinate(8, 20),
                new Coordinate(9, 20),
                new Coordinate(10, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);
        });

        test('Makes a turn', () => {
            const snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.changeDirectionTo(DIRECTION.UP);
            let expectedCoordinates: Coordinate[] = [
                baseCoordinate,
                new Coordinate(11, 20),
                new Coordinate(12, 20),
                new Coordinate(13, 20),
            ];

            expect(snake.getCoordinates()).toMatchObject(expectedCoordinates);

            let expectedNewCoordinates: Coordinate[] = [
                new Coordinate(10, 19),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            snake.changeDirectionTo(DIRECTION.RIGHT);
            expectedNewCoordinates = [
                new Coordinate(11, 19),
                new Coordinate(10, 19),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            snake.changeDirectionTo(DIRECTION.DOWN);
            expectedNewCoordinates = [
                new Coordinate(11, 20),
                new Coordinate(11, 19),
                new Coordinate(10, 19),
                new Coordinate(10, 20),

            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);
        });
    });

    describe('Grows', () => {
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;

        test('Grows', () => {
            let snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.changeDirectionTo(DIRECTION.LEFT);
            snake.grow();

            let expectedNewCoordinates: Coordinate[] = [
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
                new Coordinate(13, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            expectedNewCoordinates = [
                new Coordinate(8, 20),
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            snake.grow(2);

            // grow 1 segment
            expectedNewCoordinates = [
                new Coordinate(7, 20),
                new Coordinate(8, 20),
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);

            //grow another segment
            expectedNewCoordinates = [
                new Coordinate(6, 20),
                new Coordinate(7, 20),
                new Coordinate(8, 20),
                new Coordinate(9, 20),
                new Coordinate(10, 20),
                new Coordinate(11, 20),
                new Coordinate(12, 20),
            ];
            snake.move();
            expect(snake.getCoordinates()).toMatchObject(expectedNewCoordinates);
        });

    });
    
    describe('Updates state', () => {
        let baseCoordinate = new Coordinate(10, 20);
        let baseLength = 4;

        test('not moves on short time update', () => {
            const snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.move = jest.fn();
            snake.update(1);
            expect((snake.move as any).mock.calls.length).toBe(0);
        });

        test('Moves on equal time to move dt update', () => {
            const snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.move = jest.fn();
            snake.update(TIME_TO_MOVE);
            expect((snake.move as any).mock.calls.length).toBe(1);
        });

        test('Moves on bigger time to move dt update', () => {
            const snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.move = jest.fn();
            snake.update(TIME_TO_MOVE + 1);
            expect((snake.move as any).mock.calls.length).toBe(1);
        });

        test('Moves multiple times if dt is too big', () => {
            const snake = new Snake(baseCoordinate.clone(), baseLength);
            snake.move = jest.fn();
            snake.update(TIME_TO_MOVE * 5 + 1);
            expect((snake.move as any).mock.calls.length).toBe(5);
        });
    });

});