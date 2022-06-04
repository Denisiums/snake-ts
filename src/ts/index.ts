import {Game} from './models/game';

document.addEventListener('DOMContentLoaded', function() {
    console.log('lalala loaded');
    const game = new Game();
    game.start();

    setTimeout(() => {
        game.end();
    }, 5000)
});

