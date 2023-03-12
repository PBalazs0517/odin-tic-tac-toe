const board = document.getElementById('board');
const boardOverlay = document.getElementById('boardOverlay');
const popup = document.getElementById('popup');
const popupMsg = document.getElementById('msg');
const playerNameOne = document.getElementById('playerOneName');
const playerNameTwo = document.getElementById('playerTwoName');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const endBtn = document.getElementById('end');
startBtn.addEventListener( 'click', () => game.start() );
resetBtn.addEventListener( 'click', () => game.reset() );
endBtn.addEventListener( 'click', () => game.end() );
function playerFactory ( name, marker ) {
    const getName = () => name;
    const getMarker = () => marker;
    return {getName, getMarker};
};
const game = ( () => {
        const inputs = [playerNameOne, playerNameTwo]
        let players = [];
        let tiles = [];
        let round = 0; 
        const tilesPush = ( x ) => tiles.push( x );
        const roundIncrement = () => round++;
        const getRound = () => round;
        const start = () => {
            for( let i = 0; i < 2; i++ ) {
                players.push(playerFactory(inputs[1].value == '' ? 'P' + ( i + 1 ) : inputs[1].value, inputs[i].dataset.marker));
            };
            boardOverlay.classList.toggle('active');
            inputs.forEach(input => input.disabled = 'true');
            startBtn.disabled = true;
            resetBtn.disabled = false;
        };
        const reset = () => {
            boardOverlay.classList.toggle('active');
            inputs.forEach((input, i) => { 
                input.disabled = false;
                input.value = '';
            });
            startBtn.disabled = false;
            resetBtn.disabled = true;
            players = [];
            tiles.forEach( tile => {
                tile.dataset.marker = 'none';
                tile.textContent = '';
                tile.dataset.used = false;
            } );
            round = 0;
        };
        const end = () => {
            reset();
            popup.classList.toggle('active2')
        };
        const checkForThreeInARow = () => {
            for ( let i = 0; i < 3; i++ ) {
                if( (tiles[0+3*i].dataset.marker !== 'none' && tiles[1+3*i].dataset.marker !== 'none' && tiles[2+3*i].dataset.marker !== 'none' ) && (tiles[0+3*i].dataset.marker === tiles[1+3*i].dataset.marker && tiles[0+3*i].dataset.marker === tiles[2+3*i].dataset.marker && tiles[1+3*i].dataset.marker === tiles[2+3*i].dataset.marker) ) {
                    popupMsg.textContent = `${game.players[game.getRound() % 2].getName()} (${game.players[game.getRound() % 2].getMarker()}) won the game!!!`;
                    popup.classList.toggle('active2');
                };
                if( (tiles[0+1*i].dataset.marker !== 'none' && tiles[3+1*i].dataset.marker !== 'none' && tiles[6+1*i].dataset.marker !== 'none' ) && (tiles[0+1*i].dataset.marker === tiles[3+1*i].dataset.marker && tiles[0+1*i].dataset.marker === tiles[6+1*i].dataset.marker && tiles[3+1*i].dataset.marker === tiles[6+1*i].dataset.marker) ) {
                    popupMsg.textContent = `${game.players[game.getRound() % 2].getName()} (${game.players[game.getRound() % 2].getMarker()}) won the game!!!`;
                    popup.classList.toggle('active2');
                };
                if( i < 2 && (tiles[0+2*i].dataset.marker !== 'none' && tiles[4].dataset.marker !== 'none' && tiles[8+(-2)*i].dataset.marker !== 'none' ) && (tiles[0+2*i].dataset.marker === tiles[4].dataset.marker && tiles[0+2*i].dataset.marker === tiles[8+(-2)*i].dataset.marker && tiles[4].dataset.marker === tiles[8+(-2)*i].dataset.marker) ) {
                    popupMsg.textContent = `${game.players[game.getRound() % 2].getName()} (${game.players[game.getRound() % 2].getMarker()}) won the game!!!`;
                    popup.classList.toggle('active2');
                };
                if( 1 < i && ( tiles.every(tile => tile.dataset.used === 'true') ) ) {
                    popupMsg.textContent = `It is a tie`;
                    popup.classList.toggle('active2');
                }
            };
        }
        return { tilesPush, roundIncrement, getRound, start, reset, players, checkForThreeInARow, end };
    }
)();
const generateBoard = ( () => {
        for ( let i = 0; i < 9; i++ ) {
            const tile = document.createElement('div');
            tile.id = 't' + i;
            tile.dataset.marker = 'none';
            tile.dataset.used = false;
            tile.classList.toggle('tile');
            tile.addEventListener('click', () => {
                if( tile.dataset.used === 'false' ) {
                    tile.dataset.marker = game.players[game.getRound() % 2].getMarker();
                    tile.textContent = tile.dataset.marker;
                    tile.dataset.used = true;
                    game.checkForThreeInARow()
                    game.roundIncrement();
                };
            });
            board.appendChild(tile);
            game.tilesPush(tile);
        };
    }
)();