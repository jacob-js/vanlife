import './App.css'
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans, { vansLoader } from './pages/Vans/Vans'

import "./server"
import VanDetails from './pages/Vans/VanDetails'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import Dashboard from './pages/Host/Dashboard'
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound'

const router = createHashRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='about' element={<About />} />
    <Route path='vans' element={<Vans />} loader={vansLoader} />
    <Route path='vans/:id' element={<VanDetails />} />
    <Route path="host" element={<HostLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="income" element={<Income />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="vans">
        <Route index element={<HostVans />} />
        <Route path=":id" element={<HostVanDetail />}>
          <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
))

function App() {

  return <RouterProvider router={router} />
}

export default App
