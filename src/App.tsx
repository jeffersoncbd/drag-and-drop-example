import { useState } from "react";
import { storedPlants } from "./plants";

interface Card {
  id: string
  description: string
}

export interface Plant {
  id: string
  name: string
  cards: Card[]
}


function App() {
  const [cardBeingDragged, setCardBeingDragged] = useState<Card | undefined>(undefined)
  const [plants, setPlants] = useState<Plant[]>(storedPlants)

  return (
    <div id="container">
      {plants.map((plant) => (
        <div
          key={plant.id}
          id={plant.id}
          className="plant"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (cardBeingDragged !== undefined) {
              const newPlants = plants.map((plant) => {
                plant.cards = plant.cards.filter((card) => card.id !== cardBeingDragged.id)
                return plant
              }).map((plantOfState) => {
                if (plant.id === plantOfState.id && cardBeingDragged !== undefined) {
                  const newPlant = { ...plantOfState, cards: [...plantOfState.cards, cardBeingDragged] }
                  return newPlant
                }
                return plantOfState
              })
              setCardBeingDragged(undefined)
              setPlants(newPlants)
            }
          }}
        >
          <h2>{plant.name}</h2>
          {plant.cards.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="card"
              draggable
              onDragStart={(e) => {
                e.currentTarget.style.opacity = '0.2'
                setCardBeingDragged(card)
              }}
              onDragEnd={(e) => e.currentTarget.style.opacity = '1'}
            >
              {card.description}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
