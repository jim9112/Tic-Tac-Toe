! function () {
    const main = document.querySelector('body');
    const board = document.getElementById('board');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const boxes = document.querySelector('.boxes');
    const box = document.getElementsByClassName("box");
    var trackIfPlayer1Turn = true;
    // winning combination 
    const winningNumbers = [0, 1, 2, 0, 3, 6, 3, 4, 5, 6, 7, 8, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
    let tempArr = [];
    // An array of objects that save data about the two players
    let players = [{
            playerName: '',
            playerPiece: 'o',
            playerClass: 'box box-filled-1',
            playerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
            playerName: '',
            playerPiece: 'x',
            playerClass: 'box box-filled-2',
            playerScore: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];
    // Obj handles all content changes for all screens
    const screens = {
        startScreen: {
            setClass: 'screen screen-start',
            setID: 'start',
            setContent: '<header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header>'
        },
        oWin: {
            setClass: 'screen screen-win screen-win-one',
            setID: 'finish',
            setContent: '<header> <h1>Tic Tac Toe</h1> <p class="message">O Wins!!!</p> <a href="#" class="button">New game</a> </header>'
        },
        xWin: {
            setClass: 'screen screen-win screen-win-two',
            setID: 'finish',
            setContent: '<header> <h1>Tic Tac Toe</h1> <p class="message">X Wins!!!</p> <a href="#" class="button">New game</a> </header>'
        },
        tie: {
            setClass: 'screen screen-win screen-win-tie',
            setID: 'finish',
            setContent: '<header> <h1>Tic Tac Toe</h1> <p class="message"> Tie!!!</p> <a href="#" class="button">New game</a> </header>'
        },
        // Creates div for screen changes
        createConstructor: () => {
            const newScreen = document.createElement('div');
            newScreen.className = 'newScreen';
            main.appendChild(newScreen);
        },
         // changes display parameters of screen
        changeElement: (element, display) => element.style.display = display,
        // deletes content in constructor div
        deleteContent: () => {
            const newScreen = document.querySelector('.newScreen');
            newScreen.innerHTML = '';
        },
        // function creates the start and win pages
        createPage: (classObj, idObj, contentObj) => {
            const newScreen = document.querySelector('.newScreen');
            const pageContent = document.createElement('div');
            pageContent.className = classObj;
            pageContent.id = idObj;
            pageContent.innerHTML = contentObj;
            newScreen.appendChild(pageContent);
        }
    };

    const gameControls = {
        // Sets start player
        beginGame: () => player1.className = 'players active',
        // Function checks the board and adjusts each players score
        scoring: () => {
            let trackTurns = 0;
            for (i = 0; i < box.length; i++) {      
                if (box[i].className === 'box box-filled-1') {
                    players[0].playerScore[i] = 1;
                    trackTurns += 1;
                } else if (box[i].className === 'box box-filled-2') {
                    players[1].playerScore[i] = 1;
                    trackTurns += 1;
                }   
            }
            if (trackTurns === 9){
                screens.changeElement(board, 'none');
                screens.createPage(screens.tie.setClass, screens.tie.setID, screens.tie.setContent);
                gameControls.resetGame();
                eventListener.startButton();
            }
        },
        // checks to see if current player has won
        checkForWin: (player) => {
            for (i = 0; i < winningNumbers.length; i = i + 3) {
                let answerArr = [winningNumbers[i], winningNumbers[i + 1], winningNumbers[i + 2]];
                tempArr = [players[player].playerScore[answerArr[0]], players[player].playerScore[answerArr[1]], players[player].playerScore[answerArr[2]]];
                if (tempArr[0] === 1 && tempArr[1] === 1 && tempArr[2] === 1) {
                    screens.changeElement(board, 'none');
                    if (player === 0){
                        screens.createPage(screens.oWin.setClass, screens.oWin.setID, screens.oWin.setContent);
                    } else {
                        screens.createPage(screens.xWin.setClass, screens.xWin.setID, screens.xWin.setContent);
                    }
                    gameControls.resetGame();
                    eventListener.startButton();
                }
            }
        },
        // resets game parameters
        resetGame: () => {
            players[0].playerScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            players[1].playerScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            trackIfPlayer1Turn = true;
            for (i=0; i<box.length; i++){
                box[i].className = 'box';
                player2.className = 'players';
            }
        }
    };
    // Object handles event listeners
    const eventListener = {
        // event listener for start button
        startButton: () => {
            const startButton = document.querySelector('.button');
            startButton.addEventListener('click', (e) => {
                screens.deleteContent();
                screens.changeElement(board, '');
                gameControls.beginGame();
            });
        }
    };
    
    // brings up start page and hides the game board
    screens.createConstructor();
    screens.changeElement(board, 'none');
    screens.createPage(screens.startScreen.setClass, screens.startScreen.setID, screens.startScreen.setContent);
    eventListener.startButton();
    
    // checks for clicks on boxes and enters player move
    boxes.addEventListener('click', (e) => {
        if (trackIfPlayer1Turn === true) {
            e.target.className = 'box box-filled-1';
            trackIfPlayer1Turn = false;
            player1.className = 'players';
            player2.className = 'players active';
            gameControls.scoring();
            gameControls.checkForWin(0);
        } else {
            e.target.className = 'box box-filled-2';
            trackIfPlayer1Turn = true;
            player2.className = 'players';
            player1.className = 'players active';
            gameControls.scoring();
            gameControls.checkForWin(1);
        }
    });

    // checks for mouse hover and generates preview
    boxes.addEventListener('mouseover', (e) => {
        if (trackIfPlayer1Turn && e.target.className === 'box') {
            e.target.style = 'background-image: url(img/o.svg);';
        } else if (!trackIfPlayer1Turn && e.target.className === 'box') {
            e.target.style = 'background-image: url(img/x.svg);';
        }
    });

    // checks for mouse exit and removes preview
    boxes.addEventListener('mouseout', (e) => e.target.style = '');
}();