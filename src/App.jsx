import './App.css'
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans, { vansLoader } from './pages/Vans/Vans'

import "./server"
import VanDetails, { loader as vanLoader } from './pages/Vans/VanDetails'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import Dashboard from './pages/Host/Dashboard'
import HostVans, {loader as hostVansLoader} from './pages/Host/HostVans'
import HostVanDetail, {loader as hostVanLoader } from './pages/Host/HostVanDetail'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login, {loader as loginLoader} from './pages/Login'
import { requireAuth } from './utils'

const router = createHashRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route
      path="login"
      element={<Login />}
      loader={loginLoader}
    />
    <Route path='about' element={<About />} />
    <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
    <Route path='vans/:id' element={<VanDetails />} loader={vanLoader} />
    <Route path="host" element={<HostLayout />} loader={async() => await requireAuth()}>
      <Route 
        index 
        element={<Dashboard />}
        loader={async() => await requireAuth()}
      />
      <Route path="income" element={<Income />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="vans">
        <Route index element={<HostVans />} loader={hostVansLoader} />
        <Route path=":id" element={<HostVanDetail />} loader={hostVanLoader}>
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
