import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Gallery from './pages/Gallery'
import Edit from './pages/Edit'
import Detail from './pages/Detail'
import './App.css'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">Pokémon Team Builder</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create a Pokémon</Link></li>
            <li><Link to="/gallery">Pokémon Gallery</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App
