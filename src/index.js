// import React from 'react';
// import { AppRedux } from './AppRedux';
import './index.css';
import ReactDOM from 'react-dom';


import React, { Component } from 'react';
import { GameButton } from './GameButton';
import { topReducer } from './reducers';
import { createStore } from 'redux';

// Main component, holds the state for the game
class AppRedux extends Component {
  constructor(props){
    super(props);
    this.handleGameButtonClick = this.handleGameButtonClick.bind(this);
    this.initGame = this.initGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }


  // Start intervals to show the sequence up to the targetIndex
  // Reset usermoves for next sequence guess.
  // Whilst sequence is showing, disable acceptingUserInput
  runSequence(targetIndex){
    store.dispatch({
      type: 'DISALLOW_USER_INPUT',
      value: false
    });
    store.dispatch({
      type: 'EMPTY_USER_MOVES'
    })

    for (let i=0; i<targetIndex; i++){
      setTimeout( () => {
        this.animateGameButton(store.getState().sequence[i]);
        this.playSound(store.getState().sequence[i]);
      }, 500*(i+1));
    };
    setTimeout( () => {
      store.dispatch({
        type: 'ALLOW_USER_INPUT',
        value: true
      });
    }, 500*(targetIndex+1));
  }

//Check guessID against ID of corresponding item in sequence array
  validateUserGuess(guessID){
    let state = store.getState();

    // index of current guess to validate will be state.usermoves.length-1.
    let index = state.usermoves.length-1;

    //Here using fuzzy equals, as one of them is an int and other a string. Could parse int but no need for deep equality here
    if (state.sequence[index]==guessID){
      // if this guess is the final guess of the sequence up to this point,
      if (index === state.currentMoveIndex - 1){
        this.correctSequenceGuess();
      } // Otherwise continue to allow next guess in the sequence
    } else {
      this.incorrectGuess();
    }
  }

  correctSequenceGuess(){
    //If currentMoveIndex < 20, increase and runSequence with currentMoveIndex++
    // else Won game!
    if (store.getState().currentMoveIndex<19){
      store.dispatch({
        type: 'INCREASE_CURRENT_MOVE_INDEX'
      })
      this.runSequence(store.getState().currentMoveIndex);
    } else {
      // USER HAS WON THE GAME!
      alert('winner winner chicken dinner');
      this.resetGame();
    }
  }

  incorrectGuess(){
    let state = store.getState();

    //Flash red background
    let root = document.getElementById('root');
    root.classList.add('fail');
    setTimeout( () => {
      root.classList.remove('fail');
    }, 100);
    //If livesRemaining>0, livesRemaining--, and runSequence again w currentMoveIndex
    // else lost game!
    if (state.livesRemaining>0){
      store.dispatch({
        type: 'LOSE_A_LIFE'
      })
      this.runSequence(state.currentMoveIndex)
    } else {
      alert('you have lost! doofus');
      this.resetGame();
    }
  }

// Flash the button when it is activated by adding a class and removing it shortly after
  animateGameButton(id){
    let but = document.getElementById(`game-button-${id}`);
    but.classList.add('button-active');
    setTimeout( () => {
      but.classList.remove('button-active');
    }, 100);
  }

  // Make a new sequence and start runSequence
  initGame(){
    store.dispatch({
      type: 'GENERATE_SEQUENCE'
    })
    store.dispatch({
      type: 'START_GAME'
    })

    this.runSequence(store.getState().currentMoveIndex);
  }

  resetGame(){
    store.dispatch({
      type: 'RESET_GAME'
    })
    store.dispatch({
      type: 'RESET_LIVES'
    })
    store.dispatch({
      type: 'RESET_CURRENT_MOVE_INDEX'
    })
  }

  handleGameButtonClick(id){
    if (store.getState().acceptingUserInput){
      this.animateGameButton(id);
      this.playSound(id);
      store.dispatch({
        type: 'ADD_USER_MOVE',
        guessID: id
      })
      this.validateUserGuess(id);
    }
  }

  playSound(id){
    let audio = document.getElementById(`audio${id}`);
    audio.play();
  }

  render() {
    return (
      <div className="App">
        <div
          className='button start-game-button' id='start-game-button'
          style= {{display: store.getState().gameStarted ? 'none' : 'block'}}
          onClick= {this.initGame}
          > Start Game </div>
        <div className='game-button-container'>
          <GameButton id='0' onClick={this.handleGameButtonClick} />
          <GameButton id='1' onClick={this.handleGameButtonClick} />
          <GameButton id='2' onClick={this.handleGameButtonClick} />
          <GameButton id='3' onClick={this.handleGameButtonClick} />
        </div>
        <div className='infoAndResetContainer'>
          <div className='button reset-button' id='reset-button' onClick={this.resetGame} > Reset </div>
          <div className='livesRemainingDisplay'>Lives left: {store.getState().livesRemaining}</div>
          <div className='currentStepsDisplay'>Steps: {store.getState().currentMoveIndex}</div>
        </div>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<AppRedux />, document.getElementById('root'));
}
const store = createStore(topReducer);

store.subscribe(render)

render();
