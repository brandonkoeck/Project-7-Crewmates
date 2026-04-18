import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    pokemon: ''
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  const getImageUrl = (pokemonName) => {
    try {
      return new URL(`../assets/${pokemonName.toLowerCase()}.gif`, import.meta.url).href
    } catch {
      return null
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [id])

  const fetchPokemon = async () => {
    try {
      const { data, error } = await supabase
        .from('pokemon')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setFormData({
        name: data.name,
        speed: data.speed,
        pokemon: data.pokemon
      })
    } catch (error) {
      setMessage({ type: 'error', text: `Error loading pokemon: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value })
  }

  const handleSpeedChange = (e) => {
    setFormData({ ...formData, speed: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.name || !formData.speed) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('pokemon')
        .update({
          name: formData.name,
          speed: parseInt(formData.speed)
        })
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Pokemon updated successfully!' })
      setTimeout(() => navigate('/gallery'), 1500)
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this Pokemon?')) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('pokemon')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Pokemon deleted!' })
      setTimeout(() => navigate('/gallery'), 1000)
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` })
      setLoading(false)
    }
  }

  if (loading && !formData.name) {
    return (
      <main className="edit-container">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="edit-container">
      <h1>Edit Pokemon</h1>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {formData.pokemon && getImageUrl(formData.pokemon) && (
        <img 
          src={getImageUrl(formData.pokemon)} 
          alt={formData.pokemon}
          style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
        />
      )}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button type="button" onClick={() => navigate('/gallery')} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
        <button type="button" onClick={handleDelete} disabled={loading} style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}>
          Delete
        </button>
      </form>
    </main>
  )
}
