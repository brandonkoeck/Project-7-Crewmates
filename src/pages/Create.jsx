import { useState } from 'react'
import { supabase } from '../client'

const POKEMON_OPTIONS = [
  'Charizard',
  'Venusaur',
  'Blastoise',
  'Pikachu',
  'Mewtwo',
  'Deoxys',
  'Umbreon',
  'Rayquaza'
]

export default function Create() {
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    pokemon: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value })
  }

  const handleSpeedChange = (e) => {
    setFormData({ ...formData, speed: e.target.value })
  }

  const handlePokemonChange = (pokemonName) => {
    setFormData({ ...formData, pokemon: pokemonName })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    // Validate form
    if (!formData.name || !formData.speed || !formData.pokemon) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('pokemon')
        .insert([
          {
            name: formData.name,
            speed: parseInt(formData.speed),
            pokemon: formData.pokemon
          }
        ])

      if (error) throw error

      setMessage({ type: 'success', text: 'Pokemon created successfully!' })
      setFormData({ name: '', speed: '', pokemon: '' })
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="create-container">
      <h1>Create a Pokémon</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
        </div>

        {/* Speed Input */}
        <div className="form-group">
          <label htmlFor="speed">Speed</label>
          <input
            id="speed"
            type="number"
            value={formData.speed}
            onChange={handleSpeedChange}
            placeholder="Enter speed value"
          />
        </div>

        {/* Pokemon Selection */}
        <div className="form-group">
          <label>Choose Pokémon:</label>
          <div className="pokemon-options">
            {POKEMON_OPTIONS.map(pokemon => (
              <div key={pokemon} className="radio-item">
                <input
                  type="radio"
                  id={pokemon}
                  name="pokemon"
                  value={pokemon}
                  checked={formData.pokemon === pokemon}
                  onChange={() => handlePokemonChange(pokemon)}
                />
                <label htmlFor={pokemon}>{pokemon}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </main>
  )
}
