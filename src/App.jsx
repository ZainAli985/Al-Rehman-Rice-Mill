import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import StatusBadge from './components/StatusBadge';
const status = import.meta.env.VITE_STATUS_MESSAGE;


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <StatusBadge initialMessage={status} />
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
