import { combineReducers } from 'redux';

// Return an array of 20 items: random numbers between 0-3
const generateSequence = () => {
  let seq = [];
  for (let i=0; i<20; i++){
    seq.push(Math.floor(Math.random()*4))
  };
  return seq
}


const sequence = (state=[], action) => {
  switch(action.type){
    case 'GENERATE_SEQUENCE':
      return generateSequence();
    default:
      return state;
  }
}

const usermoves = (state=[], action) => {
  switch(action.type){
    case 'EMPTY_USER_MOVES':
      return [];
    case 'ADD_USER_MOVE':
      return [...state, action.guessID];
    default:
      return state;
  }
}

const currentMoveIndex = (state=1, action) => {
  switch(action.type){
    case 'INCREASE_CURRENT_MOVE_INDEX':
      return state+=1;
    case 'RESET_CURRENT_MOVE_INDEX':
      return 1;
    default:
      return state;
  }
}

const gameStarted = (state=false, action) => {
  switch(action.type){
    case 'START_GAME':
      return true;
    case 'RESET_GAME':
      return false;
    default:
      return state;
  }
}

const livesRemaining = (state=3, action) => {
  switch(action.type){
    case 'LOSE_A_LIFE':
      return state -= 1;
    case 'RESET_LIVES':
      return 3;
    default:
      return state;
  }
}

const acceptingUserInput = (state=false, action) => {
  switch(action.type){
    case 'ALLOW_USER_INPUT':
      return true;
    case 'DISALLOW_USER_INPUT':
      return false;
    default:
      return state;
  }
}

export const topReducer = combineReducers({
  sequence,
  usermoves,
  currentMoveIndex,
  gameStarted,
  livesRemaining,
  acceptingUserInput
})
