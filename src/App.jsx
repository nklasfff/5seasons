import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Seasons from './pages/Seasons.jsx'
import SeasonDetail from './pages/SeasonDetail.jsx'
import Stub from './pages/Stub.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Stub
              label="Home"
              title="The Energy of the 5 Seasons"
              note="A companion to Isabelle Evita Søndergaard's work."
            />
          }
        />
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
        <Route
          path="recipes"
          element={
            <Stub
              label="Recipes"
              title="Seasonal Recipes"
              note="Food aligned with the energy of the season."
            />
          }
        />
      </Route>
    </Routes>
  )
}
