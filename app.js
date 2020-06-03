/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// var x = document.querySelector('#name-1').textContent;
// console.log(x);

//
// document.querySelector('#score-0').innerHTML = '<em>' + 5 + '<em>';
var scores, currentPlayer, currentScore, playing;
var number = 0;
init();
alert(" WELCOME!!! The game has 2 players, playing in rounds. In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score. BUT, if the player rolls a 1, all his ROUND score gets lost. Also, If any player rolls 6 two times in a row, then the TOTAL score will reset to 0. After that, it's the next player's turn. The player can choose to 'Hold', which means that his ROUND score gets added to his TOTAL score. After that, it's the next player's turn. The first player to reach TARGET points on TOTAL score wins the game. By default, a player who scores 100 points first, will be the WINNER. You can also set the TARGET SCORE manually if you want. There is one input box provided to set the TARGET SCORE. GUD LUCK!!");

var name1 = prompt("Enter player 1 name!");
var name2 = prompt("Enter player 2 name!");

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  var flag = false;
  if(playing) {
    //Generate random integers 1 - 6
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var co1 = new Audio("sounds/MANYDICE.wav");
    co1.play();
    if(dice1 === 6 && dice2 === 6) {
      //if(dice2 === 6) {
        scores[currentPlayer] = 0;
        document.getElementById('score-' + currentPlayer).textContent = '0';
        //next Player Turn
        nextPlayer();
        console.log(dice1, dice2);
        flag = true
      //}
    }
    // if(dice === 5) {
    //   if(number === 5) {
    //       document.getElementById('score-' + currentPlayer).textContent = '0';
    //       //next player
    //       nextPlayer();
    //       flag = true;
    //       number = 0;
    //   }
    //   else {
    //     number = 5;
    //   }
    // }
    // else {
    //   number = 0;
    // }
    //display the result

      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
      document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

      if(!flag) {
      //update the round score IF the rolled number is not 1
      if (dice1 !== 1 && dice2 != 1) {
        currentScore += dice1 + dice2;
        document.querySelector('#current-' + currentPlayer).textContent = currentScore;
      } else {
        //next player
        nextPlayer();
      }
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(playing) {
    var co1 = new Audio("sounds/tap.mp3");
    co1.play();
    scores[currentPlayer] += currentScore;
    document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    if(input) {
      winningScore = input;
    }
    else {
      winningScore = 100;
    }
    //player win
    if (scores[currentPlayer] >= winningScore) {
      var co1 = new Audio("sounds/winner.wav");
      co1.play();
      document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
      playing = false;
    }
    else {
      //next player
      nextPlayer();
    }
  }
});
//next player
function nextPlayer() {
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
  currentScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', function() {
  init();
  var co1 = new Audio("sounds/tap.mp3");
  co1.play();
});

function init() {
   scores = [0, 0];
   currentScore = 0;
   currentPlayer = 0;
   playing = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = name1;
  document.getElementById('name-1').textContent = name2;
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
