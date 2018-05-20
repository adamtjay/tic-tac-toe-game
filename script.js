jQuery(function() {

var gameWon = 0;

var $gameBoard = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];

var clicked;

var turnCounter = 0;

var currentTurn = "";


function updateGameBoard(node) {
  //checks game isn't over, if it's won then does nothing
  if (gameWon === 1) {
      console.log('Game completed, restart to play again');
  } else { //**** Runs main game logic
        //check that clicked node hasn't already been selected, or else stops counter
        if ($gameBoard[node] > 0) {
            turnCounter -= 1;
            confirm('Spot already in use. Please try again.');
        } else {
          //Based on counter: update both game & player boards, add Sign
            if (turnCounter % 2 === 0) {
                $gameBoard[node] = 1;
                playerOne.$playerBoard[clicked] = 1;
                playerOne.addSign(clicked);
                console.log(`P1 selected: ${node}`);    //can comment out
            } else {
                $gameBoard[node] = 2;
                playerTwo.$playerBoard[clicked] = 1;
                playerTwo.addSign(clicked);
                console.log(`P2 selected: ${node}`);    //can comment out
      }
    }
  }
}

$('td').on('click', function() {
    //passes what was clicked on to updateGameBoard, then runs winCheck
    clicked = $(this).attr('data-id');

    //updateGameBoard runs more functions, based on who clicked
    updateGameBoard(clicked);

    //make sure nobody has won before continuing
    playerOne.winCheck();
    playerTwo.winCheck();


    turnCounter++;
    turnUpdate();


});



function player(num, name, sign, color) {
    this.playerNum = num;
    this.playerName = name;
    this.$playerSign = sign;
    this.$playerColor = color;

    this.$playerBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ],

    //update message showing the current turn
  player.prototype.takeTurn = function() {
          let $message = $('h3.messages');
          $message.text(`Current turn: Player ${this.playerNum}`);
          $message.css('color', this.$playerColor);


  },

  player.prototype.addSign = function(node) {
    //console.log(`P${this.playerNum} selected: ${node}`);    //can comment out
    $('td').eq(node).append('<h1>').text(this.$playerSign);
    $('td').eq(node).css('color', this.$playerColor);

  },

  player.prototype.winCheck = function() {

        //check Rows
        if (this.$playerBoard[0] + this.$playerBoard[1] + this.$playerBoard[2] === 3 ||
            this.$playerBoard[3] + this.$playerBoard[4] + this.$playerBoard[5] === 3 ||
            this.$playerBoard[6] + this.$playerBoard[7] + this.$playerBoard[8] === 3) {
                gameWon = 1;
                let $message = $('h3.messages');
                $message.text(`Tic Tac Toe! Player ${this.playerNum} wins.`);
                $message.css('color', this.$playerColor);
                alert(`Tic Tac Toe! Player ${this.playerNum} wins.`);
                console.log(`Tic Tac Toe by row, Player ${this.playerNum} wins.`);
            }

      //check Columns
      if(this.$playerBoard[0] + this.$playerBoard[3] + this.$playerBoard[6] === 3 ||
         this.$playerBoard[1] + this.$playerBoard[4] + this.$playerBoard[7] === 3 ||
         this.$playerBoard[2] + this.$playerBoard[5] + this.$playerBoard[8] === 3) {
             gameWon = 1;
             let $message = $('h3.messages');
             $message.text(`Tic Tac Toe! Player ${this.playerNum} wins.`);
             $message.css('color', this.$playerColor);
             alert(`Tic Tac Toe! Player ${this.playerNum} wins.`);
             console.log(`Tic tac toe by column, Player ${this.playerNum} wins.`);
         }

      //check Diagonals
      if (this.$playerBoard[0] + this.$playerBoard[4] + this.$playerBoard[8] === 3 ||
          this.$playerBoard[2] + this.$playerBoard[4] + this.$playerBoard[6] === 3) {
              gameWon = 1;
              let $message = $('h3.messages');
              $message.text(`Tic Tac Toe! Player ${this.playerNum} wins.`);
              $message.css('color', this.$playerColor);
              alert(`Tic Tac Toe! Player ${this.playerNum} wins.`);
              console.log(`Tic tac toe by diagonal, Player ${this.playerNum} wins.`);

      if (gameWon != 1) {
        return 0;
    }
    }
    }
  }


var playerOne = new player(1, "One", "X", "red");
var playerTwo = new player(2, "Two", "O", "blue");


function turnUpdate() {
  if (gameWon != 1) {
      if (turnCounter % 2 === 0) {
          currentTurn = "Go: Player 1";
          console.log(currentTurn);
          playerOne.takeTurn();
      } else {
          currentTurn = "Go: Player 2";
          console.log(currentTurn);
          playerTwo.takeTurn();
    }
  }
}

turnUpdate();




})                                 // do not delete this })
