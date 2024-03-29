import {Coordinate} from './coordinate';
import {DIRECTION} from './constants';

// todo: mb make coordinates non-mutating?
export class Segment {
    coordinate: Coordinate;
    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
    }

    // moveTo(coordinate: Coordinate): void {
    //     this.coordinate.moveTo(coordinate);
    // }

    moveToSegment(segment: Segment): void {
        this.coordinate.moveTo(segment.coordinate);
    }

    moveToDirection(direction: DIRECTION): void {
        switch(direction) {
            case DIRECTION.LEFT:
                this.coordinate.moveLeft();
                break;
            case DIRECTION.RIGHT:
                this.coordinate.moveRight();
                break;
            case DIRECTION.UP:
                this.coordinate.moveTop();
                break;
            case DIRECTION.DOWN:
                this.coordinate.moveBottom();
                break;
            default:
                // nothing changes
                console.log('trying to move nowhere');
        }
    }




}