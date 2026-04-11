import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Seasons from './pages/Seasons.jsx'
import SeasonDetail from './pages/SeasonDetail.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Pause from './pages/Pause.jsx'
import BodyClock from './pages/BodyClock.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="seasons" element={<Seasons />} />
        <Route path="seasons/:id" element={<SeasonDetail />} />
        <Route path="body-clock" element={<BodyClock />} />
        <Route path="pause" element={<Pause />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
      </Route>
    </Routes>
  )
}
