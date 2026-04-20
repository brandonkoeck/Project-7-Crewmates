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

export default function Home() {
  const getImageUrl = (pokemonName) => {
    try {
      return new URL(`../assets/${pokemonName.toLowerCase()}.gif`, import.meta.url).href
    } catch {
      return null
    }
  }

  return (
    <main className="home-container">
      <section className="hero-section">
        <h1>Welcome to Pokémon Team Builder</h1>
        <p>Assemble your ultimate team of Pokémon!</p>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h2>Create Your Team</h2>
          <p>Build custom Pokémon characters with unique attributes and abilities. Give them names, set their stats, and create the ultimate team!</p>
        </div>

        <div className="info-card">
          <h2>View Your Collection</h2>
          <p>Browse all the Pokémon you've created. See your entire team at a glance, organized by creation date. Click on a Pokémon to view more info.</p>
        </div>

        <div className="info-card">
          <h2>Customize & Manage</h2>
          <p>Edit existing Pokémon to fine-tune their attributes, or remove them from your team. Full control is yours!</p>
        </div>
      </section>

      <section className="pokemon-gallery-section" style={{ marginTop: '3rem' }}>
        <div className="pokemon-grid-home" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {POKEMON_OPTIONS.map(pokemon => (
            <div key={pokemon} style={{ textAlign: 'center' }}>
              {getImageUrl(pokemon) && (
                <img 
                  src={getImageUrl(pokemon)} 
                  alt={pokemon}
                  style={{ width: '100%', height: '150px', objectFit: 'contain' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <p style={{ color: '#8a2be2', fontWeight: 'bold', marginTop: '0.5rem' }}>{pokemon}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
