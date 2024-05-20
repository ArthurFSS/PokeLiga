import Table from './pages/Table'
import AppBar from './components/AppBar'
import React from 'react';
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <AppBar/>
      <Outlet/>
    </div>
  )
}

export default App
