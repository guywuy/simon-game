import './index.css';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { topReducer } from './reducers/reducers';
import { App } from './components/App';
import { generateSequence } from './helperFunctions';


// COMPONENTS
//
// Provider
//   main app
//     presentational start button
//     container game buttons
//       presentational button * 4
//     container footer items
//       presentational reset button
//       presentational gamestate displays

let initialState= {
  gameState: {
    sequence: generateSequence(),
    currentMoveIndex: 1,
    gameStarted: false,
    livesRemaining: 3
  },
  acceptingUserInput: false
}

let store = createStore(topReducer, initialState);

render(<Provider store={store} >
        <App />
        </Provider>, document.getElementById('root'));
