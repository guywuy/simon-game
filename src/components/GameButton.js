import React from 'react';
import PropTypes from 'prop-types'

export const GameButton = ({
  onClick,
  id
}) => {
  return (
    <div className='button game-button' id={'game-button-' + id} onClick={()=>{onClick(id)}}></div>
  )
}


GameButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string
}
