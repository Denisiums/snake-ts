export function getRandomWithinRange(min: number, max: number) {

    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}