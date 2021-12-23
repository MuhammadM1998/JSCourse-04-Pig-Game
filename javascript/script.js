'use strict';

let scores, roundScore, activePlayer, isGamePlaying;

init();

// Roll Button
document.querySelector('.btn--roll').addEventListener('click', function () {
	if (isGamePlaying) {
		// Generating a number between 1 and 6.
		let dice = Math.ceil(Math.random() * 6);

		// Display the corresponding dice image.
		let diceDOM = document.querySelector('.dice');
		diceDOM.src = 'images/dice-' + dice + '.png';
		diceDOM.style.display = 'block';

		// Updating the round score if the dice value != 1.
		if (dice !== 1) {
			// Add Score.
			roundScore += dice;
			document.querySelector('#current--' + activePlayer).textContent = roundScore;
		} else {
			// Switch players.
			nextPlayer();
		}
	}
});

// Hold Button
document.querySelector('.btn--hold').addEventListener('click', function () {
	if (isGamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;
		// Update the UI
		document.querySelector('#score--' + activePlayer).textContent =
			scores[activePlayer];

		// Check if a player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector('#name--' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.dice').style.display = 'none';
			document
				.querySelector('.player--' + activePlayer)
				.classList.add('player--winner');
			document
				.querySelector('.player--' + activePlayer)
				.classList.remove('player--active');
			isGamePlaying = false;
		} else {
			// Switch players.
			nextPlayer();
		}
	}
});

// New Game Button
document.querySelector('.btn--new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	isGamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('current--0').textContent = '0';
	document.getElementById('score--0').textContent = '0';
	document.getElementById('current--1').textContent = '0';
	document.getElementById('score--1').textContent = '0';
	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';
	document.querySelector('.player--0').classList.remove('player--winner');
	document.querySelector('.player--1').classList.remove('player--winner');
	document.querySelector('.player--0').classList.remove('player--active');
	document.querySelector('.player--1').classList.remove('player--active');
	document.querySelector('.player--0').classList.add('player--active');
}

function nextPlayer() {
	roundScore = 0;
	document.querySelector('#current--' + activePlayer).textContent = roundScore;
	activePlayer = activePlayer ? 0 : 1;
	document.querySelector('.player--0').classList.toggle('player--active');
	document.querySelector('.player--1').classList.toggle('player--active');
	document.querySelector('.dice').style.display = 'none';
}

console.log('OK');
