import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans'

import "./server"
import VanDetails from './pages/VanDetails'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import Dashboard from './pages/Host/Dashboard'
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='vans' element={<Vans />} />
          <Route path='vans/:id' element={<VanDetails />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
