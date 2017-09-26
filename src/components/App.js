import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StartButton } from './StartButton';
import { GameButtonContainer } from './GameButtonContainer';
import { FooterItemsContainer } from './FooterItemsContainer';
import { startSequence } from '../helperFunctions';
import * as actionCreators from '../actions/actionCreators';

const AppDisplay = (props) => {

  const onStartGame = () => {
    props.startGame()
    props.disableUserInput()
    startSequence(props.gameState);
    setTimeout(()=>{
    props.enableUserInput()
    }, 500)
  }

  return (
    <div className="App">
      {!props.gameState.gameStarted && <StartButton onClick={onStartGame} />}
      <GameButtonContainer />
      <FooterItemsContainer />
    </div>
 )
}

const mapStateToProps = (state) => {
  return {
    gameState: state.gameState
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}
export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDisplay)
