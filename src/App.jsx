import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './components/AppBar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <AppBar user={user} />
      <Outlet context={{ user, setUser }} />
    </div>
  );
}

export default App;
