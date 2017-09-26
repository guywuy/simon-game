import React from 'react';
import { GameButton } from './GameButton';
import { connect } from 'react-redux';
import { checkGuess, startSequence } from '../helperFunctions';
import { correctGuess, incorrectGuess } from '../actions/actionCreators';

const GameButtonsDisplay = (props) => {

  let gameState = props.gameState;
  const handleGameButtonClick = (id) => {
    console.log(gameState.currentMoveIndex, 'currentMoveIndex')
    console.log(checkGuess(id, gameState.sequence[gameState.currentMoveIndex]));
    if (checkGuess(id, gameState.sequence[gameState.currentMoveIndex])){
      //User has guessed correctly, if they haven't won yet (cmi is less than 20)
      // dispatch action and start sequence again
      props.onCorrectGuess();
      startSequence(gameState);
    } else {
      //User has guessed wrong. If they have lives left, dispatch loselife action
      // and play sequence again
    }
  }

  return (
    <div className='game-button-container'>
      <GameButton id='0' onClick={handleGameButtonClick} />
      <GameButton id='1' onClick={handleGameButtonClick} />
      <GameButton id='2' onClick={handleGameButtonClick} />
      <GameButton id='3' onClick={handleGameButtonClick} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    gameState: state.gameState,
    acceptingUserInput: state.acceptingUserInput
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCorrectGuess: () => dispatch(correctGuess()),
    onIncorrectGuess: () => dispatch(incorrectGuess())
  }
}
export const GameButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameButtonsDisplay)

//
// When one is clicked, need to check guess.
// If guess is correct, check if not at end of sequence, then dispatch CORRECT_GUESS action and runSequence
// If not correct, check if livesRemaining>0. If it is, dispatch INCORRECT_GUESS action and runSequence
