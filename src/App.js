import React, { Component } from 'react';
import { GameButton } from './GameButton';

// Main component, holds the state for the game
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      moves: [],
      usermoves: [],
      speed: 1
    }
    this.handleGameButtonClick = this.handleGameButtonClick.bind(this);
  }

  handleGameButtonClick(id){
    console.log(id);
    this.setState( prevState => {
      return {
        usermoves: [...prevState.usermoves, id]
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className='game-button-container'>
          <GameButton id='0' onClick={this.handleGameButtonClick} />
          <GameButton id='1' onClick={this.handleGameButtonClick} />
          <GameButton id='2' onClick={this.handleGameButtonClick} />
          <GameButton id='3' onClick={this.handleGameButtonClick} />
        </div>
        <div className='usermovesdisplay'>{this.state.usermoves}</div>
      </div>
    );
  }
}

export default App;
