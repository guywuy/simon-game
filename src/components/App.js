import React from 'react';
import { connect } from 'react-redux';
import { StartButton } from './StartButton';
import { GameButtonContainer } from './GameButtonContainer';
import { FooterItemsContainer } from './FooterItemsContainer';
import { startSequence } from '../helperFunctions';

const AppDisplay = ({gameInProgress, startGame}) => {

  return (
    <div className="App">
      {!gameInProgress && <StartButton onClick={startGame} />}
      <GameButtonContainer />
      <FooterItemsContainer />
    </div>
 )
}

const mapStateToProps = (state) => {
  return {
    gameInProgress: state.gameState.gameStarted
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startGame: () => {
      dispatch({
        type: 'START_GAME'
      })
      dispatch({
        type: 'DISABLE_USER_INPUT'
      })
      startSequence(ownProps.store);
      setTimeout(()=>{
        dispatch({
          type: 'ENABLE_USER_INPUT'
        })
      }, 500)
    }
  }
}
export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDisplay)
