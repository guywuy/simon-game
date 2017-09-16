import React, { Component } from 'react';
import { GameButton } from './GameButton';

// Main component, holds the state for the game
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sequence: [],
      usermoves: [],
      currentMoveIndex: 0,
      speed: 1,
      gameStarted: false,
      livesRemaining: 3
    }
    this.handleGameButtonClick = this.handleGameButtonClick.bind(this);
    this.initGame = this.initGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  // Return an array of 20 items, random numbers between 0-3
  generateSequence(){
    let seq = [];
    for (let i=0; i<20; i++){
      seq.push(Math.floor(Math.random()*4))
    };
    console.log('Generated sequence ', seq);
    return seq
  }

  // Start interval
  runSequence(){

  }

  animateGameButton(id){
    let but = document.getElementById(`game-button-${id}`);
    // console.log('but', but);
    but.classList.add('button-active');
    setTimeout( () => {
      but.classList.remove('button-active');
    }, 100);
  }

  initGame(){
    this.setState({
      sequence: this.generateSequence(),
      usermoves: [],
      currentMoveIndex: 0,
      gameStarted: true,
      livesRemaining: 3
    })
  }

  resetGame(){
    this.setState({
      sequence: [],
      usermoves: [],
      currentMoveIndex: 0,
      gameStarted: false,
      livesRemaining: 3
    })
  }

  handleGameButtonClick(id){
    console.log(id);
    this.animateGameButton(id);
    this.setState( prevState => {
      return {
        usermoves: [...prevState.usermoves, id],
        currentMoveIndex: prevState.currentMoveIndex++
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div
          className='start-game-button' id='start-game-button'
          style= {{display: this.state.gameStarted ? 'none' : 'block'}}
          onClick= {this.initGame}
          > Start Game </div>
        <div className='game-button-container'>
          <GameButton id='0' onClick={this.handleGameButtonClick} />
          <GameButton id='1' onClick={this.handleGameButtonClick} />
          <GameButton id='2' onClick={this.handleGameButtonClick} />
          <GameButton id='3' onClick={this.handleGameButtonClick} />
        </div>
        <div className='reset-button' id='reset-button' onClick={this.resetGame} > Reset </div>
        <div className='sequencedisplay'>Generated sequence: {this.state.sequence}</div>
        <div className='usermovesdisplay'>Users moves: {this.state.usermoves}</div>
        <div className='currentMoveIndexdisplay'>Move index: {this.state.currentMoveIndex}</div>
      </div>
    );
  }
}

export default App;
