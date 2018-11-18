const main = document.querySelector('body');
const board = document.getElementById('board');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const boxes = document.querySelector('.boxes');
const box = document.getElementsByClassName("box");

// winning combination 
const winningNumbers = [0,1,2,0,3,6,3,4,5,6,7,8,1,4,7,2,5,8,0,4,8,2,4,6];
let tempArr =[];
// An array of objects that save data about the two players
let players = [
    {
        playerName: '',
        playerPiece: 'o',
        playerClass: 'box box-filled-1',
        playerScore: [0,0,0,0,0,0,0,0,0]
    },
    {
        playerName: '',
        playerPiece: 'x',
        playerClass: 'box box-filled-2',
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
};

// checks for clicks on boxes and enters player move
boxes.addEventListener('click', (e) => {
    if (trackIfPlayer1Turn === true) {
        e.target.className = 'box box-filled-1';
        trackIfPlayer1Turn = false;
        player1.className = 'players';
        player2.className = 'players active';
        scoring();
        checkForWin(0);
    } else {
        e.target.className = 'box box-filled-2';
        trackIfPlayer1Turn = true;
        player2.className = 'players';
        player1.className = 'players active';
        scoring();
        checkForWin(1);
    }
});

// checks for mouse hover and generates preview
boxes.addEventListener('mouseover', (e)=>{
    if (trackIfPlayer1Turn && e.target.className === 'box'){
        e.target.style = 'background-image: url(img/o.svg);';
    } else if(!trackIfPlayer1Turn && e.target.className === 'box'){
        e.target.style = 'background-image: url(img/x.svg);';
    }
});

// checks for mouse exit and removes preview
boxes.addEventListener('mouseout', (e) => e.target.style = '');

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

const checkForWin = (player) => {
    for (i=0; i<winningNumbers.length; i=i+3){
        let answerArr = [winningNumbers[i], winningNumbers[i+1], winningNumbers[i+2]];
        tempArr = [players[player].playerScore[answerArr[0]], players[player].playerScore[answerArr[1]], players[player].playerScore[answerArr[2]]];
        if (tempArr[0] === 1 && tempArr[1] === 1 && tempArr[2] === 1){
            console.log('winner');
        }
    }
};