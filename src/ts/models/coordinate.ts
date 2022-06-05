export class Coordinate {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isSame(other: Coordinate): boolean {
        if (!other) {
            return false;
        }

        return this.x === other.x && this.y === other.y;
    }

    clone(): Coordinate {
        return new Coordinate(this.x, this.y);
    }

    setX(x: number): Coordinate {
        this.x = x;
        return this;
    }

    setY(y: number): Coordinate {
        this.y = y;
        return this;
    }

    getLeftCoordinate(): Coordinate {
        return this.clone().moveLeft();
    }

    getRightCoordinate(): Coordinate {
        return this.clone().moveRight();
    }

    getTopCoordinate(): Coordinate {
        return this.clone().moveTop();
    }

    getBottomCoordinate(): Coordinate {
        return this.clone().moveBottom();
    }

    moveLeft(): Coordinate {
        this.x = this.x - 1;
        return this;
    }

    moveRight(): Coordinate {
        this.x = this.x + 1;
        return this;
    }

    moveTop(): Coordinate {
        this.y = this.y - 1;
        return this;
    }

    moveBottom(): Coordinate {
        this.y = this.y + 1;
        return this;
    }

    moveTo(coordinate: Coordinate) {
        this.x = coordinate.x;
        this.y = coordinate.y;
        return this;
    }
}