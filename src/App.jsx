import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Seasons from './pages/Seasons.jsx'
import SeasonDetail from './pages/SeasonDetail.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeSeasonDetail from './pages/RecipeSeasonDetail.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Pause from './pages/Pause.jsx'
import PauseSeasonDetail from './pages/PauseSeasonDetail.jsx'
import BodyClock from './pages/BodyClock.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="seasons" element={<Seasons />} />
          <Route path="seasons/:id" element={<SeasonDetail />} />
          <Route path="body-clock" element={<BodyClock />} />
          <Route path="pause" element={<Pause />} />
          <Route path="pause/:seasonId" element={<PauseSeasonDetail />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:seasonId/:id" element={<RecipeDetail />} />
          <Route path="recipes/:seasonId" element={<RecipeSeasonDetail />} />
        </Route>
      </Routes>
    </>
  )
}
