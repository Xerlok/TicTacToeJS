"use strict";
const Game = (() => {
    const GameBoard = {
        isGameActive: true,

        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],

        player: [{name: 'Player 1', number: 1, color: 'red', score: 0},
            {name: "Player 2", number: 2, color: 'blue', score: 0}
        ],

        initialize: function() {
            this.activePlayer = this.player[0];
            
            this.cacheDOM();
            this.playerTurn.innerText = `${this.activePlayer.name} turn `;
            this.playerTurn.style.color = this.activePlayer.color;
            this.bindEvents();
        },

        drawMark: function(row,column) {
            if(GameBoard.board[row][column] === '' && this.isGameActive){
                if(this.activePlayer.number === 1){
                    GameBoard.board[row][column] = 'X';
                    /* GameBoard.gigaChadAItron3000(); */
                    this.render();
                    this.checkWinner();
                    this.switchPlayer();
                }
                else {
                    GameBoard.board[row][column] = 'O';
                    /* GameBoard.gigaChadAItron3000(); */
                    this.render();
                    this.checkWinner();
                    this.switchPlayer();
                }
            }
        },

        gigaChadAItron3000: function() {
            loop1:
            for (let i = 0; i < 3; i++) {
                loop2:
                for (let j = 0; j < 3; j++) {
                    if(GameBoard.board[i][j] === '') {
                        GameBoard.board[i][j] = 'O';
                        break loop1;
                    }
                }
            }
            console.table(GameBoard.board);
        },

        switchPlayer: function() {
            if (this.isGameActive) {
                this.activePlayer = this.activePlayer === GameBoard.player[0] ? GameBoard.player[1] : GameBoard.player[0];
                this.render();
            }
        },

        announceWinner: function() {
            this.playerTurn.innerText = `${this.activePlayer.name} wins!`;
            this.activePlayer.score += 1;
            this.isGameActive = false;
            this.nextRound.style.display = 'block';
        },

        checkWinner: function() {
            //check rows
            for (let i = 0; i <= 2; i++) {
                if (GameBoard.board[i][0] === '') {continue};
                if (GameBoard.board[i][0] === GameBoard.board[i][1] && GameBoard.board[i][1] === GameBoard.board[i][2]) {
                    GameBoard.announceWinner();
                }
            }
            //check columns
            for (let i = 0; i <= 2; i++) {
                if (GameBoard.board[0][i] === '') {continue};
                if (GameBoard.board[0][i] === GameBoard.board[1][i] && GameBoard.board[1][i] === GameBoard.board[2][i]) {
                    GameBoard.announceWinner();
                }
            }
            //check diagonals
            if (GameBoard.board[1][1] != '') {
                if (GameBoard.board[0][0] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][2]) {
                    GameBoard.announceWinner();
                }
                else if (GameBoard.board[0][2] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][0]) {
                    GameBoard.announceWinner();
                }
            }
            //draw?
            let areAllFieldsDrawn;
            for (let i = 0; i < 3; i++) {
                areAllFieldsDrawn = GameBoard.board.flat().includes('');
                if (!areAllFieldsDrawn && this.isGameActive) {
                    this.playerTurn.innerText = 'Draw!';
                    this.playerTurn.style.color = 'black';
                    this.isGameActive = false;
                    this.nextRound.style.display = 'block';
                    break;
                }
            }
            this.xScore.innerText = `X:${this.player[0].score}`;
            this.oScore.innerText = `O:${this.player[1].score}`;
        },

        cacheDOM: function() {
            const fields = document.querySelectorAll('.field');
            const restartBtn = document.querySelector('.restart');
            const toMenu = document.querySelector('.toMenu');
            const topPanel = document.querySelector('.top-panel');
            const playerTurn = document.querySelector('.playerTurn');
            const xScore = document.querySelector('#x');
            const oScore = document.querySelector('#o');
            const sglPLayerBtn = document.querySelector('.sglPlayer');
            const multiplayer = document.querySelector('.multiplayer');
            const wrapperBoard = document.querySelector('.wrapper-board');
            const menu = document.querySelector('.menu');
            const nextRound = document.querySelector('.nextRound');

            this.fields = fields;
            this.restartBtn = restartBtn;
            this.toMenu = toMenu;
            this.topPanel = topPanel;
            this.playerTurn = playerTurn;
            this.xScore = xScore;
            this.oScore = oScore;
            this.sglPLayerBtn = sglPLayerBtn;
            this.multiplayer = multiplayer;
            this.wrapperBoard = wrapperBoard;
            this.menu = menu;
            this.nextRound = nextRound;
        },

        render: function() {
            this.fields[0].innerText = GameBoard.board[0][0];
            this.fields[1].innerText = GameBoard.board[0][1];
            this.fields[2].innerText = GameBoard.board[0][2];
            this.fields[3].innerText = GameBoard.board[1][0];
            this.fields[4].innerText = GameBoard.board[1][1];
            this.fields[5].innerText = GameBoard.board[1][2];
            this.fields[6].innerText = GameBoard.board[2][0];
            this.fields[7].innerText = GameBoard.board[2][1];
            this.fields[8].innerText = GameBoard.board[2][2];

            this.playerTurn.innerText = `${this.activePlayer.name} turn`;
            this.playerTurn.style.color = this.activePlayer.color;
            this.xScore.innerText = `X:${this.player[0].score}`;
            this.oScore.innerText = `O:${this.player[1].score}`;
        },

        nextRoundFnctn: function () {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    GameBoard.board[i][j] = '';
                }
            }
            GameBoard.nextRound.style.display = 'none';
            GameBoard.isGameActive = true;
            GameBoard.activePlayer = GameBoard.player[0];
            GameBoard.render();
        }, 

        bindEvents: function() {
            //squares
            let row;
            let column;
            let self = this;

            function restart () {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        GameBoard.board[i][j] = '';
                    }
                }
                self.isGameActive = true;
                self.nextRound.style.display = 'none';
                self.activePlayer = GameBoard.player[0];
                self.player[0].score = 0;
                self.player[1].score = 0;
                self.render();
            }

            for (let i = 0; i <= 8; i++) {
                this.fields[i].addEventListener('click', function () {
                    if (this.innerText === '') {
                        this.style.color = self.activePlayer.color;
                        row = this.dataset.row;
                        column = this.dataset.column;
                        self.drawMark(row, column);
                    }
                });
            }
            //restart button
            this.restartBtn.addEventListener('click', restart);
            //multiplayer button
            this.multiplayer.addEventListener('click', function () {
                self.menu.style.display = 'none';
                self.wrapperBoard.style.display = 'flex';
                self.topPanel.style.display = 'flex';
                self.render();
            })
            //back to menu
            this.toMenu.addEventListener('click', function () {
                self.menu.style.display = 'flex';
                self.wrapperBoard.style.display = 'none';
                self.topPanel.style.display = 'none';
                restart();
            })
            //next round
            this.nextRound.addEventListener('click', function () {
                GameBoard.nextRoundFnctn();
            })
        },
    };
    GameBoard.initialize();
})();



