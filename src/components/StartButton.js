import React from 'react'
import PropTypes from 'prop-types'

export const StartButton = ({
  onClick
}) => {
  return <div
        className='button start-game-button' id='start-game-button'
        onClick={onClick}
        > Start Game </div>
}

StartButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
