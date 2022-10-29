import React from 'react'
import './SingleCard.css'

function SingleCard({card,handlechoice,flipped, dispabled}) {
  const handleChange=()=>
  {
    if(! dispabled)
    {
      handlechoice(card)
    }  
    }
  return (
    <div className='card' key={card.id}>
    <div className={flipped ? "flipped": ""}>
      <img className='front' src={card.src} alt="card front"/>
      <img className='back'
       src='/img/cover.png'
        alt='card back' onClick={handleChange}>
       
        </img>
    </div>
  </div>
  )
}

export default SingleCard