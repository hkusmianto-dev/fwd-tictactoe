try{
    var game = new Game(3, 3);
}catch (e){
    alert(e)
}

// JavaScript Document
$(document).ready(function () {
    $("#playerOneDesc").text(game.playerOne.toUpperCase() + " won");
    $("#playerTwoDesc").text(game.playerTwo.toUpperCase() + " won");
    renderBoard(game);
});

function renderBoard(game) {
    $("#game").empty();
    let row = game.row;
    let col = game.col;
    adjustGrid(col);

    let currentRow = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            currentRow = i;
            let div = $("<li class='btn grid-item clr'></li>")
                .text(game.getCurrentMoveAt(i, j))
                .attr("data-row", i).attr("data-col", j).click(onClick);
            $("#game").append(div);
        }
    }
}

function adjustGrid(col){
    let colTemplate = "";
    for (let i = 0; i < col; i++) {
        colTemplate += "auto ";
    }
    $("#game").css("grid-template-columns", colTemplate);
}

function onClick(event){
    let target = event.target;
    let row = parseInt($(target).attr("data-row"));
    let col = parseInt($(target).attr("data-col"));
    let character = game.move(row, col);

    if(character === game.emptySymbol){
        alert('Already selected')
        return;
    }

    $(target).text(character);
    let btnClazz = character === game.playerTwo ? 'btn-info' : 'btn-primary';
    $(target).addClass('disable ' + btnClazz)

    let hasWinner = game.hasWinner(row, col);
    if( hasWinner ){
        alert(hasWinner.toUpperCase() + " wins");
        if(hasWinner === game.playerOne){
            $("#playerOne").text(game.playerOneWinCounter);
        }

        if(hasWinner === game.playerTwo){
            $("#playerTwo").text(game.playerTwoWinCounter);
        }
    } else if(game.isBoardFull() ){
        alert('Its a tie. It will restart.')
        reset();

    }
}

function reset(){
    game.reset();
    renderBoard(game);
}
