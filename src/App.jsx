import { useState } from 'react'
import Table from './pages/Table'
import AppBar from './pages/AppBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppBar/>
      <Table/>
    </div>
  )
}

export default App
