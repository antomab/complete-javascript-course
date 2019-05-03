/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, winningScore;

var diceDom1 = document.querySelector('.dice-1');
var diceDom2 = document.querySelector('.dice-2');

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (!gamePlaying) return;

    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    diceDom1.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + '.png';

    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + dice2 + '.png';

    // 2.1 if rolled 6 twice in a row then player loses all
    if (prevRoll == 6 && dice1 == 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        nextPlayer();
    }
    else if (dice1 > 1 && dice2 > 1) {
        // 3. update the round score, only IF neither rolled number is 1

        // add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        nextPlayer();
    }

    prevRoll = dice1;
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (!gamePlaying) return;

    // add current score to global score
    scores[activePlayer] += roundScore;

    // update ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
        gamePlaying = false;

        document.querySelector('#name-' + activePlayer).textContent = 'winner';
        diceDom1.style.display = 'none';
        diceDom2.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');


    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevRoll = 0;

    var value = document.getElementById('winning-score').value;
    if (value && value > 0) {
        winningScore = value;
    } else {
        winningScore = 20;
        document.getElementById('winning-score').value = winningScore;
    }

    diceDom1.style.display = 'none';
    diceDom2.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');


    document.querySelector('.player-0-panel').classList.add('active');

};

function nextPlayer () {
    activePlayer = (activePlayer === 0 ? 1 : 0);
    roundScore = 0;
    prevRoll = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDom1.style.display = 'none';
    diceDom2.style.display = 'none';

};