export const startGame = () => {
  return {
    type: 'START_GAME'
  }
}
export const disableUserInput = () => {
  return {
    type: 'DISABLE_USER_INPUT'
  }
}
export const enableUserInput = () => {
  return {
    type: 'ENABLE_USER_INPUT'
  }
}
export const correctGuess = () => {
  return {
    type: 'CORRECT_GUESS'
  }
}
export const incorrectGuess = () => {
  return {
    type: 'INCORRECT_GUESS'
  }
}
