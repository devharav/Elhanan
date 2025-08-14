import './App.css';
import Nav from './components/NavBar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [openNav, setOpenNav] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Nav
        openNav={openNav}
        onCloseNav={() => setOpenNav(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main style={{ flexGrow: 1, padding: 20 }}>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
