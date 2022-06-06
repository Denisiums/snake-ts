import {Segment} from './segment';
import {DIRECTION, TIME_TO_MOVE} from './constants';
import {Coordinate} from './coordinate';
import {GameObject} from './gameObject';

export class Snake implements GameObject {
    private tail: Segment[] = [];
    private head: Segment;
    private direction: DIRECTION = DIRECTION.LEFT;
    private growing: number = 0;
    private timeToMove: number = TIME_TO_MOVE;
    private crashChecked: boolean = false;

    constructor(headCoordinate: Coordinate, initialLength: number) {
        this.direction = DIRECTION.LEFT;
        this.head = new Segment(headCoordinate);
        if (initialLength > 1) {
            this.generateTail(initialLength - 1);
        }
    }

    draw(): void {
        // todo
    }

    update(dt: number): void {
        this.timeToMove = this.timeToMove - dt;
        if (this.timeToMove > 0) {
            return;
        }

        this.move();
        this.timeToMove = this.timeToMove + TIME_TO_MOVE;

        // in case if dt is too big - repeat the update (it will "jump", but should never happen)
        if (this.timeToMove <= 0) {
            this.update(0);
        }
    }

    move(): void {
        console.log('moving');
        // from the latest tail - move every segment on previous segment position;
        // 1st tail segment moves to the head position
        // head moves forward to direction
        if (this.hasTail()) {
            let lastMovingSegmentIndex = this.tail.length - 1;
            if (this.isGrowing()) {
                this.growTail();
            }
            for (let segmentIndex = lastMovingSegmentIndex; segmentIndex >= 1; segmentIndex--) {
                this.tail[segmentIndex].moveToSegment(this.tail[segmentIndex - 1]);
            }
            this.tail[0].moveToSegment(this.head);
        }

        this.head.moveToDirection(this.direction);
        this.crashChecked = false;
    }

    grow(amount: number = 1): void {
        // sanity check
        console.log('growing');
        // on next move +1 tail segment
        this.growing = this.growing + amount;
        // mb it should first grow, then move out? No ideas what's better. Probably should grow first, but now - it grows during moving.
    }

    crash(): void {
        console.log('crashed!');
        // play animation
    }

    // it can not move to the direction of the 1st tail segment
    changeDirectionTo(direction: DIRECTION): boolean {
        if (this.direction === direction) {
            return false;
        }

        if (!this.canMoveIntoDirection(direction)) {
            console.log('can not move to: ', DIRECTION);
            return false;
        }

        this.direction = direction;
        return true;
    }

    isEatingHerself(): boolean {
        if (this.crashChecked) {
            return false;
        }

        this.crashChecked = true;
        const headCoordinate = this.getHeadCoordinate();
        const tailCoordinates = this.getTailCoordinates();
        return tailCoordinates.some(coordinate => {
            coordinate.isSame(headCoordinate);
        });
    }

    getLength(): number {
        return 1 + this.tail.length;
    }

    // boring stuff for tests
    // getHead(): Segment {
    //     return this.head;
    // }
    //
    // getTail(): Segment[] {
    //     return this.tail;
    // }
    //

    getDirection(): DIRECTION {
        return this.direction;
    }

    getCoordinates(): Coordinate[] {
        const result: Coordinate[] = [];

        result.push(this.getHeadCoordinate());
        this.getTailCoordinates().forEach(coordinate => result.push(coordinate));
        return result;
    }

    getHeadCoordinate(): Coordinate {
        return this.head.coordinate;
    }

    // end of boring stuff for tests

    private getTailCoordinates(): Coordinate[] {
        const result: Coordinate[] = [];
        this.tail.forEach(segment => {
            result.push(segment.coordinate);
        });
        return result;
    }

    private isGrowing(): boolean {
        return this.growing > 0;
    }

    private growTail(): void {
        const lastTailSegment = this.tail[this.tail.length - 1];
        if (this.growing < 1) {
            return;
        }

        this.growing--;
        this.tail.push(new Segment(lastTailSegment.coordinate.clone()));
    }

    private hasTail(): boolean {
        return !!this.tail.length;
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