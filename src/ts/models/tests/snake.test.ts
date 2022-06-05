import {Snake} from '../snake';
import {Coordinate} from '../coordinate';

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

        test('Has proper coordinates', () => {
            const coordinates: Coordinate[] = snake.getCoordinates();
            expect(coordinates).toMatchObject(expectedCoordinates);
        });

    })

});