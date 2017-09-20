import { combineReducers } from 'redux';
import { generateSequence } from '../helperFunctions';

// RESET_GAME - should generateSequence, make gameStarted false, currentMoveIndex=0, lives=3
// START_GAME - should make gameStarted true
// CORRECT_GUESS - should increment currentMoveIndex
// INCORRECT_GUESS - should decrement livesRemaining
// DISABLE_USER_INPUT - should disable user input
// ENABLE_USER_INPUT - should allow user input

const gameState = (state={}, action) => {
  switch(action.type){
    case 'RESET_GAME':
      return {
        ...state,
        gameStarted: false,
        currentMoveIndex: 1,
        livesRemaining: 3,
        sequence: generateSequence()
      };
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        currentMoveIndex: 1,
        livesRemaining: 3,
        sequence: generateSequence()
      };
    case 'CORRECT_GUESS':
      return {
        ...state,
        currentMoveIndex: state.currentMoveIndex + 1
      };
    case 'INCORRECT_GUESS':
      return {
        ...state,
        livesRemaining: state.livesRemaining - 1
      };
    default:
      return state;
  }
}

const acceptingUserInput = (state=false, action) => {
  switch(action.type){
    case 'ENABLE_USER_INPUT':
      return true;
    case 'DISABLE_USER_INPUT':
      return false;
    default:
      return state;
  }
}

export const topReducer = combineReducers({
  gameState,
  acceptingUserInput
})
