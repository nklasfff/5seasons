import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Seasons from './pages/Seasons.jsx'
import SeasonDetail from './pages/SeasonDetail.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Stub from './pages/Stub.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="seasons" element={<Seasons />} />
        <Route path="seasons/:id" element={<SeasonDetail />} />
        <Route
          path="body-clock"
          element={
            <Stub
              label="Body Clock"
              title="The Body Clock"
              note="The organ windows of the day."
            />
          }
        />
        <Route
          path="pause"
          element={
            <Stub
              label="Pause & Presence"
              title="Pause & Presence"
              note="Breath practices and journal questions."
            />
          }
        />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
      </Route>
    </Routes>
  )
}
