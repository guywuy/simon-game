import React, { Component } from 'react';
import { GameButton } from './GameButton';

// Main component, holds the state for the game
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sequence: [],
      usermoves: [],
      currentMoveIndex: 1,
      speed: 1,
      gameStarted: false,
      livesRemaining: 3,
      showingSequence: false
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

  // Start interval to show ids in array up to the targetIndex
  runSequence(targetIndex){
    this.setState({showingSequence: true});
    // Need to redo so that timers are set subsequentially, not one timer being set
    // for everything to execute at the same time after a delay....
    for (let i=0; i<targetIndex; i++){
      console.log(this.state.sequence[i]);
      setTimeout( () => {
        this.animateGameButton(this.state.sequence[i]);
      }, 400);
    }
    this.setState({showingSequence: false});
  }

//Check guessID against ID of sequence[currentMoveIndex]
  validateUserGuess(guessID){
    //if correct, usercorrectguess function, else incorrectGuess function
    if (true) this.correctGuess();
  }

  correctGuess(){
    //If currentMoveIndex < 20, increase and runSequence with currentMoveIndex++
    // else Won game!
    if (this.state.currentMoveIndex<19){
      this.setState( (prevState) => {
        return {
          currentMoveIndex: prevState.currentMoveIndex+=1
      }}, ()=>{
        this.runSequence(this.state.currentMoveIndex);
      })
    }
  }

  incorrectGuess(){
    //If livesRemaining>0, livesRemaining--, and runSequence again w currentMoveIndex
    // else lost game!
  }

  animateGameButton(id){
    let but = document.getElementById(`game-button-${id}`);
    // console.log('but', but);
    but.classList.add('button-active');
    setTimeout( () => {
      but.classList.remove('button-active');
    }, 100);
  }

  // Make a new sequence and start runSequence (callback after state is set)
  initGame(){
    this.setState({
      sequence: this.generateSequence(),
      usermoves: [],
      currentMoveIndex: 1,
      gameStarted: true,
      livesRemaining: 3
    }, ()=>{
      this.runSequence(this.state.currentMoveIndex);
    });
  }

  resetGame(){
    this.setState({
      sequence: [],
      usermoves: [],
      currentMoveIndex: 1,
      gameStarted: false,
      livesRemaining: 3
    })
  }

  handleGameButtonClick(id){
    this.animateGameButton(id);
    this.setState( prevState => {
      return {
        usermoves: [...prevState.usermoves, id]
      }
    }, ()=>{
      this.validateUserGuess(id)
    })
  }

  render() {
    return (
      <div className="App">
        <div
          className='button start-game-button' id='start-game-button'
          style= {{display: this.state.gameStarted ? 'none' : 'block'}}
          onClick= {this.initGame}
          > Start Game </div>
        <div className='game-button-container'>
          <GameButton id='0' onClick={this.handleGameButtonClick} />
          <GameButton id='1' onClick={this.handleGameButtonClick} />
          <GameButton id='2' onClick={this.handleGameButtonClick} />
          <GameButton id='3' onClick={this.handleGameButtonClick} />
        </div>
        <div className='button reset-button' id='reset-button' onClick={this.resetGame} > Reset </div>
        <div className='sequencedisplay'>Generated sequence: {this.state.sequence}</div>
        <div className='usermovesdisplay'>Users moves: {this.state.usermoves}</div>
        <div className='currentMoveIndexdisplay'>Move index: {this.state.currentMoveIndex}</div>
      </div>
    );
  }
}

export default App;
