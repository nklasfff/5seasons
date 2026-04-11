import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home      from './pages/Home'
import Seasons   from './pages/Seasons'
import BodyClock from './pages/BodyClock'
import Pause     from './pages/Pause'
import Recipes   from './pages/Recipes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 pb-16">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/seasons"    element={<Seasons />} />
            <Route path="/body-clock" element={<BodyClock />} />
            <Route path="/pause"      element={<Pause />} />
            <Route path="/recipes"    element={<Recipes />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
