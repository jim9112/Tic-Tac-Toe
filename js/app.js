const main = document.querySelector('body');
const board = document.getElementById('board');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const boxes = document.querySelector('.boxes');
const box = document.getElementsByClassName("box");

// An array of objects that save data about the two players
let players = [
    {
        playerName: '',
        playerPiece: 'o',
        playerScore: [0,0,0,0,0,0,0,0,0]
    },
    {
        playerName: '',
        playerPiece: 'x',
        playerScore: [0,0,0,0,0,0,0,0,0]
    }
];

var trackIfPlayer1Turn = true;
var gameIsDone = false;

// changes current page to be replaced with another
const changeElement = (element, display) => element.style.display = display;


// function creates the start page
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

// event listener for start button
const startButton = document.querySelector('.button');
startButton.addEventListener('click', (e) => {
    const start = document.getElementById('start');
    changeElement(start, 'none');
    changeElement(board, '');
    beginGame();
});

const beginGame = () => {
        player1.className = 'players active'; 
        nextMove();
};


// function to trigger player moves
const nextMove = () => {
    movePreview();
    boxes.addEventListener('click', (e) => {
        if (trackIfPlayer1Turn === true) {
            e.target.className = 'box box-filled-1';
            trackIfPlayer1Turn = false;
            player1.className = 'players';
            player2.className = 'players active';
        } else {
            e.target.className = 'box box-filled-2';
            trackIfPlayer1Turn = true;
            player2.className = 'players';
            player1.className = 'players active';
        }
    });
};

// function to preview the players move when the mouse is hovered over
const movePreview = () => {}
boxes.addEventListener('mouseover', (e)=>{
    if (trackIfPlayer1Turn && e.target.className === 'box'){
        e.target.style = 'background-image: url(img/o.svg);';
    } else if(!trackIfPlayer1Turn && e.target.className === 'box'){
        e.target.style = 'background-image: url(img/x.svg);';
    }
boxes.addEventListener('mouseout', (e) => e.target.style = '');
});

// Function checks the board and adjusts each players score
const scoring = () => {
    for (i=0; i<box.length;i++){
        if (box[i].className === 'box box-filled-1') {
            players[0].playerScore[i] = 1;
        } else if (box[i].className === 'box box-filled-2') {
            players[1].playerScore[i] = 1;
        }
    }
};
