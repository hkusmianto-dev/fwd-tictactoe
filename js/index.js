try{
    var game = new Game(3, 3);
}catch (e){
    alert(e)
}

// JavaScript Document
$(document).ready(function () {
    $("#playerOneDesc").text(game.playerOne.toUpperCase() + " won");
    $("#playerTwoDesc").text(game.playerTwo.toUpperCase() + " won");
    renderBoard()
});

function renderBoard() {
    let row = parseInt($("#row").val());
    let col = parseInt($("#col").val());

    if(row !== col){
        alert("Board size ( row x col ) should be equal number");
        $("#row").val(game.row);
        $("#col").val(game.col);
        return;
    }

    game.row = row;
    game.col = col;
    game.reset();

    $("#game").empty();
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

    return false;
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
