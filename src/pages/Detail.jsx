import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const POKEMON_DESCRIPTIONS = {
  Charizard: 'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.',
  Venusaur: "There is a large flower on Venusaur's back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower's aroma soothes the emotions of people.",
  Blastoise: 'Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.',
  Pikachu: 'This Pokémon has electricity-storing pouches on its cheeks. These appear to become electrically charged during the night while Pikachu sleeps. It occasionally discharges electricity when it is dozy after waking up.',
  Mewtwo: 'Mewtwo is a Pokémon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokémon\'s body, they failed to endow Mewtwo with a compassionate heart.',
  Deoxys: 'Deoxys emerged from a virus that came from space. It is highly intelligent and wields psychokinetic powers. This Pokémon shoots lasers from the crystalline organ on its chest.',
  Umbreon: 'Umbreon evolved as a result of exposure to the moon\'s waves. It hides silently in darkness and waits for its foes to make a move. The rings on its body glow when it leaps to attack.',
  Rayquaza: 'It flies forever through the ozone layer, consuming meteoroids for sustenance. The many meteoroids in its body provide the energy it needs to Mega Evolve.'
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getImageUrl = (pokemonName) => {
    try {
      return new URL(`../assets/${pokemonName.toLowerCase()}.gif`, import.meta.url).href
    } catch {
      return null
    }
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('pokemon')
          .select('*')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError
        setPokemon(data)
      } catch (err) {
        setError(`Error loading pokemon: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [id])

  if (loading) {
    return (
      <main className="detail-container">
        <p>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="detail-container">
        <p>{error}</p>
        <button onClick={() => navigate('/gallery')}>Back to Gallery</button>
      </main>
    )
  }

  if (!pokemon) {
    return (
      <main className="detail-container">
        <p>Pokemon not found</p>
        <button onClick={() => navigate('/gallery')}>Back to Gallery</button>
      </main>
    )
  }

  return (
    <main className="detail-container">
      {getImageUrl(pokemon.pokemon) && (
        <img 
          src={getImageUrl(pokemon.pokemon)} 
          alt={pokemon.pokemon}
          style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
        />
      )}

      <h1>{pokemon.name}</h1>
      <div className="pokemon-details">
        <p><strong>Pokemon Species:</strong> {pokemon.pokemon}</p>
        <p><strong>Speed:</strong> {pokemon.speed}</p>
        <p><strong>Created:</strong> {new Date(pokemon.created_at).toLocaleDateString()}</p>
        {POKEMON_DESCRIPTIONS[pokemon.pokemon] && (
          <p style={{ marginTop: '15px', fontStyle: 'italic' }}>{POKEMON_DESCRIPTIONS[pokemon.pokemon]}</p>
        )}
      </div>

      <button onClick={() => navigate(`/edit/${pokemon.id}`)} style={{ marginTop: '20px' }}>
        Edit Pokemon
      </button>
      <button onClick={() => navigate('/gallery')} style={{ marginTop: '10px', marginLeft: '10px' }}>
        Back to Gallery
      </button>
    </main>
  )
}
