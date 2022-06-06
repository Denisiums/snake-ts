import {GameLoop} from './models/gameLoop';

document.addEventListener('DOMContentLoaded', function() {
    console.log('lalala loaded');
    const game = new GameLoop();
    game.start();

    setTimeout(() => {
        game.end();
    }, 5000)
});

