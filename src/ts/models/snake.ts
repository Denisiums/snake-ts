import {Segment} from './segment';
import {DIRECTION} from './constants';
import {Coordinate} from './coordinate';

export class Snake {
    private tail: Segment[] = [];
    private head: Segment;
    private direction: DIRECTION = DIRECTION.LEFT;

    constructor(headCoordinate: Coordinate, initialLength: number) {
        this.direction = DIRECTION.LEFT;
        this.head = new Segment(headCoordinate);
        if (initialLength > 1) {
            this.generateTail(initialLength - 1);
        }
    }

    move(): void {
        console.log('moving');
    }

    grow(): void {
        console.log('growing');
        // on next move +1 tail segment
    }

    crash(): void {
        console.log('crashed!');
        // play animation
    }

    // it can not move to the direction of the 1st tail segment
    changeToDirection(direction: DIRECTION): boolean {
        if (!this.canMoveIntoDirection(direction)) {
            console.log('can not move to: ', DIRECTION);
            return false;
        }

        this.direction = direction;
        return true;
    }

    isEatingHerself(): boolean {
        // todo
        return false;
    }

    hasTail(): boolean {
        return !!this.tail.length;
    }

    getHeadCoordinate(): Coordinate {
        return this.head.coordinate;
    }

    private canMoveIntoDirection(direction: DIRECTION): boolean {
        const tailDirection = this.getTailDirection();
        return direction !== tailDirection;
    }

    // This will not allow "portal" the part of the snake. If we want, we need to check the next "move" in the direction
    private getTailDirection(): DIRECTION {
        if (!this.hasTail()) {
            return DIRECTION.NONE;
        }

        const firstTailSegment = this.tail[0];
        const headCoordinate: Coordinate = this.getHeadCoordinate();
        const firstTailSegmentCoordinate: Coordinate = firstTailSegment.coordinate;

        if (firstTailSegmentCoordinate.isSame(headCoordinate.getLeftCoordinate())) {
            return DIRECTION.LEFT;
        }

        if (firstTailSegmentCoordinate.isSame(headCoordinate.getRightCoordinate())) {
            return DIRECTION.RIGHT;
        }

        if (firstTailSegmentCoordinate.isSame(headCoordinate.getTopCoordinate())) {
            return DIRECTION.TOP;
        }

        if (firstTailSegmentCoordinate.isSame(headCoordinate.getBottomCoordinate())) {
            return DIRECTION.BOTTOM;
        }

        return DIRECTION.NONE;
    }

    // generate to the right from the head
    private generateTail(amount: number): void {
        if (amount < 0) {
            throw new Error('Negative snake can not be generated');
        }

        for (let i: number = 1; i <= amount; i++) {
            const headX = this.head.coordinate.x;
            const headY = this.head.coordinate.y;
            const segmentCoordinate: Coordinate = new Coordinate(headX + i, headY);
            this.tail.push(new Segment(segmentCoordinate));
        }
    }

}