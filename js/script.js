"use strict";
const Game = (() => {
    const GameBoard = {
        isGameActive: true,

        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],

        player: [{name: 'Player 1', number: 1, color: 'red'},
            {name: "Player 2", number: 2, color: 'blue'}
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
                    this.render();
                    this.checkWinner();
                    this.switchPlayer();
                }
                else {
                    GameBoard.board[row][column] = 'O';
                    this.render();
                    this.checkWinner();
                    this.switchPlayer();
                }
            }
        },

        switchPlayer: function() {
            if (this.isGameActive) {
                this.activePlayer = this.activePlayer === GameBoard.player[0] ? GameBoard.player[1] : GameBoard.player[0];
                this.render();
            }
        },

        checkWinner: function() {
            //check rows
            for (let i = 0; i <= 2; i++) {
                if (GameBoard.board[i][0] === '') {continue};
                if (GameBoard.board[i][0] === GameBoard.board[i][1] && GameBoard.board[i][1] === GameBoard.board[i][2]) {
                    this.playerTurn.innerText = `${this.activePlayer.name} wins!`;
                    this.isGameActive = false;
                }
            }
            //check columns
            for (let i = 0; i <= 2; i++) {
                if (GameBoard.board[0][i] === '') {continue};
                if (GameBoard.board[0][i] === GameBoard.board[1][i] && GameBoard.board[1][i] === GameBoard.board[2][i]) {
                    this.playerTurn.innerText = `${this.activePlayer.name} wins!`;
                    this.isGameActive = false;
                }
            }
            //check diagonals
            if (GameBoard.board[1][1] != '') {
                if (GameBoard.board[0][0] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][2]) {
                    this.playerTurn.innerText = `${this.activePlayer.name} wins!`;
                    this.isGameActive = false;
                }
                else if (GameBoard.board[0][2] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][0]) {
                    this.playerTurn.innerText = `${this.activePlayer.name} wins!`;
                    this.isGameActive = false;
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
                    break;
                }
            }
        },

        cacheDOM: function() {
            const fields = document.querySelectorAll('.field');
            const restartBtn = document.querySelector('.restart');
            const toMenu = document.querySelector('.toMenu');
            const playerTurn = document.querySelector('.playerTurn');
            const sglPLayerBtn = document.querySelector('.sglPlayer');
            const multiplayer = document.querySelector('.multiplayer');
            const wrapperBoard = document.querySelector('.wrapper-board');
            const menu = document.querySelector('.menu');

            this.fields = fields;
            this.restartBtn = restartBtn;
            this.toMenu = toMenu;
            this.playerTurn = playerTurn;
            this.sglPLayerBtn = sglPLayerBtn;
            this.multiplayer = multiplayer;
            this.wrapperBoard = wrapperBoard;
            this.menu = menu;
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
        },

        bindEvents: function() {
            const self = this;

            function restart() {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        GameBoard.board[i][j] = '';
                    }
                }
                self.isGameActive = true;
                self.activePlayer = GameBoard.player[0];
                self.render();
            }
            //squares
            let row;
            let column;
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
                self.playerTurn.style.display = 'flex';
            })
            //back to menu
            this.toMenu.addEventListener('click', function () {
                self.menu.style.display = 'flex';
                self.wrapperBoard.style.display = 'none';
                self.playerTurn.style.display = 'none';

                restart();
            })
        }
    };
    GameBoard.initialize();
})();



