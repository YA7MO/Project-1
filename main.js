$(document).ready(function() { 
    // initializations
    var player1HavePlayed = false;
    var player2HavePlayed = false;
    var Player1 = 'X';
    var Player2 = 'O';
    var x = '<i class="fa fas fa-times-circle fa-3x"></i>';
    var o = '<i class="far fa-circle fa-3x"></i>';
    var player1Score = 0;
    var player2Score = 0;
    var row = '';
    var col = '';
    console.log($currentplayer);
    const board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
        ];
    // set scores to initializations
    updateScore();
    // handle form submission from landing page // names of players
    $('form').on('submit', function(event) {
        event.preventDefault();
        var inputName1 = $('#player1').val();
        var inputName2 = $('#player2').val();
        window.localStorage.setItem('userName1',inputName1);
        window.localStorage.setItem('userName2',inputName2);
        // console.log(inputName1);
        // console.log(inputName2);
        window.location = 'index.html'; 
    });
    // get names of players
    var value1 = window.localStorage.getItem('userName1');
    var value2 = window.localStorage.getItem('userName2');
    // console.log(value1);
    // console.log(value2);
    // update names in score board
    $('#name1').html(`${value1} |`);
    $('#name2').html(value2);
    
    // handle playing
    $('.cell').on('click', function(){
        row = $(this).data('row');
        col = $(this).data('col');
        // update cell if not empty ->l ocation hasn't been played
        if (board[row][col] === ' '){
            if (!player1HavePlayed){
                $(this).html(x);
                board[row][col] = Player1;
                player1HavePlayed = true;
                player2HavePlayed = false;
                var win = isWinningMove();
                if(win){
                    player1Score++;
                    alert('Player1 won. Game is restarting');
                    resetGame();   
                }
            } else {
                
                $(this).html(o);
                board[row][col] = Player2;
                player2HavePlayed = true;
                player1HavePlayed = false;
                var win = isWinningMove();
                if(win){
                    player2Score++;
                    alert('Player2 won. Game is restarting');
                    resetGame();   
                 } 
            }
        }
        });

        // function to check if a move has determined the game
        function isWinningMove(){
            // horizontal win
            for(var i = 0; i < 3; i++){
                if(board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
                    return board[i][0];
                }
            }

            // vertical win
            for(var j = 0; j < 3; j++){
                if (board[0][j] != ' ' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
                    return board[0][j];
                }
            }

            // diagonal - left to right
            if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                return board[0][0];
            }

            // diagonal - right to left
            if (board[2][0] !== ' ' && board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
                return board[2][0];
            }
           var counter = 0;
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    if(board[i][j] != ' '){
                        counter++
                    }
                }
            } if(counter === 9){
                alert('Draw');
                resetGame();
            }
           
        }
                
        // reset the game board once a player won or it is a draw
        function resetGame() {
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    board[i][j] = ' '; 
                }
            }
            setTimeout(function(){  
                $('.cell').html(' ');
                updateScore();
            }, 500);
            console.log('cleared');
            return;
        }

        // update players' score board
        function updateScore() {
            var player1CurrScore = parseInt(window.localStorage.p1);
            var player2CurrScore = parseInt(window.localStorage.p2);
            player1CurrScore += player1Score;
            player2CurrScore += player2Score;
            window.localStorage.setItem('p1',player1CurrScore);
            window.localStorage.setItem('p2',player2CurrScore);
            $('#P1').html(`${localStorage.p1}`);
            $('#P2').html(`${localStorage.p2}`);
            player1Score = player2Score = 0;
        }

        $('#stratOver').on('click',function(){
            window.localStorage.p1 = 0;
            window.localStorage.p2 = 0;
            resetGame();
             setInterval(function(){
             window.location.assign('landing.html');
             }, 2000)        
       });           
});

