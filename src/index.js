import './index.css';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { topReducer } from './reducers/reducers';
import { App } from './components/App'

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

// STORE shape

// gameState: {
//   sequence: [],
//   currentMoveIndex: 0,
//   gameStarted,
//   livesRemaining
// }
// acceptingUserInput: false

let store = createStore(topReducer);

render(<Provider store={store} >
        <App store={store} />
        </Provider>, document.getElementById('root'));
