import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function Gallery() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getImageUrl = (pokemonName) => {
    try {
      return new URL(`../assets/${pokemonName.toLowerCase()}.gif`, import.meta.url).href
    } catch {
      return null
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      const { data, error } = await supabase
        .from('pokemon')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPokemon(data || [])
    } catch (error) {
      console.error('Error fetching pokemon:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="gallery-container">
        <h1>Your Pokemon Gallery</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (pokemon.length === 0) {
    return (
      <main className="gallery-container">
        <h1>Your Pokemon Gallery</h1>
        <div className="empty-state">
          <p>You haven't made a Pokemon yet!</p>
          <button onClick={() => navigate('/create')}>Create one here!</button>
        </div>
      </main>
    )
  }

  return (
    <main className="gallery-container">
      <h1>Your Pokemon Gallery</h1>
      <div className="pokemon-grid">
        {pokemon.map(p => (
          <div key={p.id} className="pokemon-card">
            <div 
              onClick={() => navigate(`/detail/${p.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {getImageUrl(p.pokemon) && (
                <img 
                  src={getImageUrl(p.pokemon)} 
                  alt={p.pokemon}
                  onError={(e) => e.target.style.display = 'none'}
                  style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
              )}
              <h2 style={{ cursor: 'pointer', textDecoration: 'underline' }}>{p.name}</h2>
            </div>
            <p><strong>Pokemon:</strong> {p.pokemon}</p>
            <p><strong>Speed:</strong> {p.speed}</p>
            <button onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
          </div>
        ))}
      </div>
    </main>
  )
}
