import { useEffect, useState } from 'react'
import Characters from './Characters'

export default function Body() {
  const [characterId, setCharacterId] = useState(1)
  const [character, setCharacter] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    async function getCharacter() {
      try {
        setError("")
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${characterId}`
        )

        if (!response.ok) {
          throw new Error("Character not found")
        }

        const data = await response.json()
        setCharacter(data)
      } catch (error) {
        setError("Failed to load character.")
        console.error(error)
      }
    }

    getCharacter()
  }, [characterId])

  function nextCharacter() {
    setCharacterId((prevId) => (prevId >= 58 ? 1 : prevId + 1))
  }

  return (
    <>
      <div>
        {character && (
          <Characters
            name={character.name}
            race={character.race}
          />
        )}
      </div>

      <button onClick={nextCharacter}>Next</button>

      {error && <p>{error}</p>}
    </>
  )
}