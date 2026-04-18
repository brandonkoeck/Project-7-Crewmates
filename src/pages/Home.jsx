export default function Home() {
  return (
    <main className="home-container">
      <section className="hero-section">
        <h1>Welcome to Pokémon Team Builder</h1>
        <p>Assemble your ultimate team of Pokémon trainers!</p>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h2>🎮 Create Your Team</h2>
          <p>Build custom Pokémon characters with unique attributes and abilities. Give them names, set their stats, and create the ultimate team!</p>
        </div>

        <div className="info-card">
          <h2>📚 View Your Collection</h2>
          <p>Browse all the Pokémon you've created. See your entire team at a glance, organized by creation date.</p>
        </div>

        <div className="info-card">
          <h2>⚙️ Customize & Manage</h2>
          <p>Edit existing Pokémon to fine-tune their abilities, or remove them from your team. Full control is yours!</p>
        </div>
      </section>
    </main>
  )
}
