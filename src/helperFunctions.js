// Return an array of 20 items: random integers between 0-3
export const generateSequence = () => {
  let seq = [];
  for (let i=0; i<20; i++){
    seq.push(Math.floor(Math.random()*4))
  };
  return seq
}


export const checkGuess = (guessID, correctID) => {
  return parseInt(guessID, 10) === parseInt(correctID, 10)
}

const playSound = id => {
    let audio = document.getElementById(`audio${id}`);
    audio.play();
  }

  // Flash the button when it is activated by adding a class and removing it shortly after
export const animateGameButton = id => {
    let but = document.getElementById(`game-button-${id}`);
    but.classList.add('button-active');
    setTimeout( () => {
      but.classList.remove('button-active');
    }, 100);
  }

  export const startSequence = gameState => {
    console.log('starting sequence')
    console.log(gameState)
    let sequenceLength = gameState.currentMoveIndex;
    for (let i=0; i<sequenceLength; i++){
      setTimeout( () => {
        animateGameButton(gameState.sequence[i]);
        playSound(gameState.sequence[i]);
      }, 500*(i+1));
    }
  }
