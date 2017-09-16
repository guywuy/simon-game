import React from 'react';

export const GameButton = ({
  onClick,
  id
}) => {
  const handleClick = () => {
    animate();
    onClick(id)
  }

  const animate = () => {

  }

  return (
    <div className='game-button' id={'game-button-' + id} onClick={handleClick}>{id}</div>
  )
}
