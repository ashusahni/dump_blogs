<<<<<<< HEAD
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Signin from './pages/Signin'
import './App.css'



function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup'element={<Signup/>} />
        <Route path='/signin'element={<Signin/>} />
        <Route path='/blog/:id'element={<Blog/>} />
        
      </Routes>
      </BrowserRouter>
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
>>>>>>> fe464b8e384512e678d91164141a6b4e5d1e4254
    </>
  )
}

export default App
