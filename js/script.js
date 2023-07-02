const Game = (() => {
    const GameBoard = {
        isGameActive: true,
        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        player: [
            {
                name: 'Player 1',
                number: 1
            },
            {
                name: "Player 2",
                number: 2
            }
        ],
        initialize: function() {
            this.activePlayer = this.player[0];
            
            this.cacheDOM();
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
            this.activePlayer = this.activePlayer === GameBoard.player[0] ? GameBoard.player[1] : GameBoard.player[0];
        },
        checkWinner: function() {
            let player;
            //rows
            for (i=0; i <= 2; i++) {
                if (GameBoard.board[i][0] === '') {continue}
                if (GameBoard.board[i][0] === GameBoard.board[i][1] && GameBoard.board[i][1] === GameBoard.board[i][2]) {
                    player = GameBoard.board[i][0];
                    alert('Player ' + player + ' Wins!');
                    this.isGameActive = false;
                }
            }
            //columns
            for (i=0; i <= 2; i++) {
                if (GameBoard.board[0][i] === '') {continue}
                if (GameBoard.board[0][i] === GameBoard.board[1][i] && GameBoard.board[1][i] === GameBoard.board[2][i]) {
                    player = GameBoard.board[0][i];
                    alert('Player ' + player + ' Wins!');
                    this.isGameActive = false;
                }
            }
            //diagonals
            if (GameBoard.board[1][1] != '') {
                if (GameBoard.board[0][0] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][2]) {
                    player = GameBoard.board[1][1];
                    alert('Player ' + player + ' Wins!');
                    this.isGameActive = false;
                }
                else if (GameBoard.board[0][2] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][0]) {
                    player = GameBoard.board[1][1];
                    alert('Player ' + player + ' Wins!');
                    this.isGameActive = false;
                }
            }
            //draw?
            let areAllFieldsDrawn;
    
            for (i = 0; i < 3; i++) {
                areAllFieldsDrawn = GameBoard.board.flat().includes('');
                if (!areAllFieldsDrawn) {
                    alert('Draw!');
                    isGameActive = false;
                    break;
                }
            }
        },
        cacheDOM: function() {
            fields = document.querySelectorAll('.field');
            restartBtn = document.querySelector('.restart');
        },
        render: function() {
            fields[0].innerText = GameBoard.board[0][0];
            fields[1].innerText = GameBoard.board[0][1];
            fields[2].innerText = GameBoard.board[0][2];
            fields[3].innerText = GameBoard.board[1][0];
            fields[4].innerText = GameBoard.board[1][1];
            fields[5].innerText = GameBoard.board[1][2];
            fields[6].innerText = GameBoard.board[2][0];
            fields[7].innerText = GameBoard.board[2][1];
            fields[8].innerText = GameBoard.board[2][2];
        },
        bindEvents: function() {
            //squares
            let row;
            let column;
            const self = this;
            for (i = 0; i <= 8; i++) {
                fields[i].addEventListener('click', function () {
                    row = this.dataset.row;
                    column = this.dataset.column;
                    self.drawMark(row, column);
                })
            }
            //restart button
            restartBtn.addEventListener('click', function () {
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        GameBoard.board[i][j] = '';
                    }
                }
                self.isGameActive = true;
                self.activePlayer = GameBoard.player[0];
                self.render();
            })
        }
    }

/*     function drawMark (row, column) {
        if(GameBoard.board[row][column] === '' && isGameActive){
            if(activePlayer.number === 1){
                GameBoard.board[row][column] = 'X';
                render();
                checkWinner();
                switchPlayer();
            }
            else {
                GameBoard.board[row][column] = 'O';
                render();
                checkWinner();
                switchPlayer();
            }
        }
    } */
    
/*     function switchPlayer() {
        activePlayer = activePlayer === GameBoard.player[0] ? GameBoard.player[1] : GameBoard.player[0];
    }     */

   /*  function checkWinner() {
        let player;
        //rows
        for (i=0; i <= 2; i++) {
            if (GameBoard.board[i][0] === '') {continue}
            if (GameBoard.board[i][0] === GameBoard.board[i][1] && GameBoard.board[i][1] === GameBoard.board[i][2]) {
                player = GameBoard.board[i][0];
                alert('Player ' + player + ' Wins!');
                isGameActive = false;
            }
        }
        //columns
        for (i=0; i <= 2; i++) {
            if (GameBoard.board[0][i] === '') {continue}
            if (GameBoard.board[0][i] === GameBoard.board[1][i] && GameBoard.board[1][i] === GameBoard.board[2][i]) {
                player = GameBoard.board[0][i];
                alert('Player ' + player + ' Wins!');
                isGameActive = false;
            }
        }
        //diagonals
        if (GameBoard.board[1][1] != '') {
            if (GameBoard.board[0][0] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][2]) {
                player = GameBoard.board[1][1];
                alert('Player ' + player + ' Wins!');
                isGameActive = false;
            }
            else if (GameBoard.board[0][2] === GameBoard.board[1][1] && GameBoard.board[1][1] === GameBoard.board[2][0]) {
                player = GameBoard.board[1][1];
                alert('Player ' + player + ' Wins!');
                isGameActive = false;
            }
        }
        //draw?
        let areAllFieldsDrawn;

        for (i = 0; i < 3; i++) {
            areAllFieldsDrawn = GameBoard.board.flat().includes('');
            if (!areAllFieldsDrawn) {
                alert('Draw!');
                isGameActive = false;
                break;
            }
        }
    } */

/*     function cacheDOM() {
        fields = document.querySelectorAll('.field');
        restartBtn = document.querySelector('.restart');
        return {fields, restartBtn};
    } */

/*     function render() {
        fields[0].innerText = GameBoard.board[0][0];
        fields[1].innerText = GameBoard.board[0][1];
        fields[2].innerText = GameBoard.board[0][2];
        fields[3].innerText = GameBoard.board[1][0];
        fields[4].innerText = GameBoard.board[1][1];
        fields[5].innerText = GameBoard.board[1][2];
        fields[6].innerText = GameBoard.board[2][0];
        fields[7].innerText = GameBoard.board[2][1];
        fields[8].innerText = GameBoard.board[2][2];
    } */

/*     function bindEvents() {
        //squares
        let row;
        let column;
        for (i = 0; i <= 8; i++) {
            fields[i].addEventListener('click', function () {
                row = this.dataset.row;
                column = this.dataset.column;
                drawMark(row, column);
            })
        }
        //restart button
        restartBtn.addEventListener('click', function () {
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    GameBoard.board[i][j] = '';
                }
            }
            isGameActive = true;
            activePlayer = GameBoard.player[0];
            render();
        })
    } */
    GameBoard.initialize();
})();



