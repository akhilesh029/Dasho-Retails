import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './componets/header/Header.jsx'
import Navbar from './componets/Header/Navbar/Navbar.jsx'
import MainDiv from './componets/Header/MainDiv/MainDiv.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Header />
    <Navbar />
    <MainDiv />
    <MainDiv />
    <MainDiv />
    <MainDiv />
    
    
  </StrictMode>
)
