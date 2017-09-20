import React from 'react';

export const GameButton = ({
  onClick,
  id
}) => {
  const handleClick = () => {
    onClick(id)
  }

  return (
    <div className='button game-button' id={'game-button-' + id} onClick={handleClick}></div>
  )
}
