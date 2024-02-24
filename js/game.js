class Game {
    playerOneWinCounter = 0;
    playerTwoWinCounter = 0;
    movementCounter = 0;

    playerOne = 'o';
    playerTwo = 'x';
    emptySymbol = '+';

    currentTurn = this.playerOne;
    board = [];

    diagonal = [{ [this.playerOne]: 0, [this.playerTwo]: 0}, { [this.playerOne]: 0, [this.playerTwo]: 0}];
    tracking = {}

    constructor(row, col) {
        if (row !== col) {
            throw "Row and column should be on equal size.\nProgram will have undefined behaviour"
        }
        this.row = row;
        this.col = col;
        this.init()
    }

    init() {
        for (let i = 0; i < this.row; i++) {
            let col = [];
            for (let j = 0; j < this.col; j++) {
                col[j] = this.emptySymbol;
            }

            this.board[i] = col;
        }
    }

    move(row, col) {
        let exist = this.board[row][col] !== this.emptySymbol;
        if (exist) {
            return this.emptySymbol;
        }

        let currentPlayer = this.currentTurn;
        this.board[row][col] = currentPlayer;

        if (this.isDiagonalMove(row, col)) {
            let tracking = this.diagonal[0];
            tracking[currentPlayer] += 1;

        }

        if (this.isInvertedDiagonalMove(row, col)) {
            let tracking = this.diagonal[1];
            tracking[currentPlayer] += 1;
        }

        let movementTracking = this.getMovementTracking(row, col);
        movementTracking.horizontal[currentPlayer] += 1;
        movementTracking.vertical[currentPlayer] += 1;

        let winner = this.hasWinner(row, col);
        if( winner ){
            this.playerOneWinCounter = winner === this.playerOne ? (this.playerOneWinCounter + 1) : this.playerOneWinCounter;
            this.playerTwoWinCounter = winner === this.playerTwo ? (this.playerTwoWinCounter + 1) : this.playerTwoWinCounter;
        }

        this.changeTurn();
        this.movementCounter++;
        return currentPlayer;
    }

    changeTurn() {
        this.currentTurn = this.currentTurn === this.playerOne ? this.playerTwo : this.playerOne;
    }

    hasWinner(row, col) {
        let max = this.row;

        if (this.isDiagonalMove(row, col)) {
            let {[this.playerOne] : playerOne, [this.playerTwo] : playerTwo} = this.diagonal[0];

            if (playerOne === max) {
                return this.playerOne;
            } else if ( playerTwo === max) {
                return this.playerTwo;
            }
        }

        if (this.isInvertedDiagonalMove(row, col)) {
            let {[this.playerOne] : playerOne, [this.playerTwo] : playerTwo} = this.diagonal[1];

            if (playerOne === max) {
                return this.playerOne;
            } else if ( playerTwo === max) {
                return this.playerTwo;
            }
        }

        let {horizontal, vertical} = this.getMovementTracking(row, col);
        let { [this.playerOne]: playerOneHorizontal, [this.playerTwo]: playerTwoHorizontal} = horizontal;
        if (playerOneHorizontal === max) {
            return this.playerOne;
        } else if (playerTwoHorizontal === max) {
            return this.playerTwo;
        }

        let {[this.playerOne]: playerOneVertical, [this.playerTwo]: playerTwoVertical} = vertical;
        if (playerOneVertical === max) {
            return this.playerOne;
        } else if (playerTwoVertical === max) {
            return this.playerTwo;
        }
    }

    isDiagonalMove(row, col) {
        return row - col === 0;
    }

    isInvertedDiagonalMove(row, col) {
        return (row + col) === (this.row - 1);
    }

    getMovementTracking(row, col) {
        let key_horizontal = "row_" + row;
        let horizontalMovement = this.tracking[key_horizontal];
        if (!horizontalMovement) {
            this.tracking[key_horizontal] = {[this.playerOne]: 0, [this.playerTwo]: 0};
            horizontalMovement = this.tracking[key_horizontal];
        }

        let key_vertical = "col_" + col;
        let verticalMovement = this.tracking[key_vertical];
        if (!verticalMovement) {
            this.tracking[key_vertical] = {[this.playerOne]: 0, [this.playerTwo]: 0};
            verticalMovement = this.tracking[key_vertical];
        }

        return {
            horizontal: horizontalMovement,
            vertical: verticalMovement
        }
    }

    getCurrentMoveAt(row, col){
        return this.board[row][col];
    }

    isBoardFull(){
        return (this.row * this.col) === this.movementCounter;
    }

    reset() {
        this.board = [];
        this.init();
        this.currentTurn = this.playerOne;
        this.diagonal = [{ [this.playerOne]: 0, [this.playerTwo]: 0}, { [this.playerOne]: 0, [this.playerTwo]: 0}];
        this.tracking = {};
        this.movementCounter = 0;
    }

}