import {GameLoop} from './models/gameLoop';

document.addEventListener('DOMContentLoaded', function() {
    console.log('lalala loaded');
    const gameLoop = new GameLoop();
    gameLoop.start();

    // setTimeout(() => {
    //     gameLoop.end();
    // }, 15000);
});

