const main = document.querySelector('body');
const board = document.getElementById('board');
const player1 = document.getElementById('player1');

var trackIfPlayer1Turn = true;
var gameIsDone = false;

// changes current page to be replaced with another
const changeElement = (element, display) => element.style.display = display;

const createStartPage = () => {
    const startPageContent = document.createElement('div');
    startPageContent.className = 'screen screen-start';
    startPageContent.id = 'start';
    startPageContent.innerHTML = '<header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header>';
    main.appendChild(startPageContent);
};

// brings up start page and hides the game board
changeElement(board, 'none');
createStartPage();

const startButton = document.querySelector('.button');
startButton.addEventListener('click', (e) => {
    const start = document.getElementById('start');
    changeElement(start, 'none');
    changeElement(board, '');
    beginGame();
});

const beginGame = () => {
        player1.className = 'players active'; 
        const boxes = document.querySelector('.boxes');
        boxes.addEventListener('click', (e) => {
            console.log(e.target.element);
            e.target.className = 'box box-filled-1';
        }); 
};


