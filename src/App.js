import './App.css'
import {useState,useEffect} from "react"
import SingleCard from './Components/SingleCard'
const cardImages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false},
]

function App() {
  const[cards,setCards]=useState([])
  const[turns,setTurns]=useState(0)
  const[choiceOne,setChoiceone]=useState(null)
  const[choiceTwo,setChoicetwo]=useState(null)
  const[dispabled,setDisabled]=useState(false)
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    setCards(shuffledCards)
    setChoiceone(null)
    setChoicetwo(null)
    setTurns(0)
  }
  const handlechoice=(card)=>{
    choiceOne ? setChoicetwo(card) :setChoiceone(card)

  }
  useEffect(() => {
 
   if(choiceOne && choiceTwo)
   {
    setDisabled(true)
    if(choiceOne.src===choiceTwo.src)
    {
     setCards(prevCard =>{
      return prevCard.map(card=>{
        if(card.src === choiceOne.src)
        {
          return{...card, matched: true}
        }
        else{
          return card

        }
      })
     })
      resetTurn()
    }
    else{
     
     setTimeout(()=>resetTurn(),1000) 
    }
   }
  }, [choiceOne,choiceTwo])
  console.log(cards)
  const resetTurn=()=>{
    setChoiceone(null)
    setChoicetwo(null)
    setTurns(prevTurn=>prevTurn+1)
    setDisabled(false)
  }
  useEffect(()=>{
    shuffleCards()
  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard key={card.id}
           card={card}
           handlechoice={handlechoice}
           flipped={card=== choiceOne || card===choiceTwo || card.matched}
           dispabled={dispabled}
           />
         
        ))}

      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App