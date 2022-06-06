export interface GameObject {
    draw(): void;
    update(dt: number, time?: number): void;
}