import { useEffect, useState } from 'react'
import axios from 'axios'
import './global.css'

export default function Home() {
  const [repositories, setRepositories] = useState([])
  const [location, setLocation] = useState({}) 

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived)
  }, [])

  function handlePositionReceived({ coords}) {
    const { latitude, longitude } = coords
    setLocation({ latitude, longitude })
  }

  useEffect(() => {
    const buscandoApi = async () => {
      const res = await axios.get('https://api.github.com/users/mariomendonca/repos')
      setRepositories(res.data)
    }
    buscandoApi()

  }, [repositories])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories])

  
  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories)
  }

  // console.log(repositories)
  return (
    <div className='home-container'>
      <h1>hello world</h1>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))} 
      </ul>
      <p>latitude: {location.latitude}</p>
      <p>longitude: {location.longitude}</p>
    </div>
  )
}
