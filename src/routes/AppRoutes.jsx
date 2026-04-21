import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Athletes } from '@/pages/Athletes'
import { AthleteDetail } from '@/pages/AthleteDetail'
import { Coaches } from '@/pages/Coaches'
import { CoachDetail } from '@/pages/CoachDetail'
import { Workouts } from '@/pages/Workouts'
import { WorkoutLibrary } from '@/components/workouts/WorkoutLibrary'
import { ExerciseLibrary } from '@/components/workouts/ExerciseLibrary'
import { WorkoutTemplates } from '@/components/workouts/WorkoutTemplates'
import { WorkoutDetail } from '@/pages/WorkoutDetail'
import { ExerciseDetail } from '@/pages/ExerciseDetail'
import { Nutrition } from '@/pages/Nutrition'
import { Messaging } from '@/pages/Messaging'
import { Subscriptions } from '@/pages/Subscriptions'
import { Analytics } from '@/pages/Analytics'
import { Templates } from '@/pages/Templates'
import { SettingsPage } from '@/pages/SettingsPage'
import { NotFound } from '@/pages/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="athletes">
          <Route index element={<Athletes />} />
          <Route path=":slug" element={<AthleteDetail />} />
        </Route>
        <Route path="coaches">
          <Route index element={<Coaches />} />
          <Route path=":slug" element={<CoachDetail />} />
        </Route>
        <Route path="workouts" element={<Workouts />}>
          <Route index element={<Navigate to="library" replace />} />
          <Route path="library" element={<WorkoutLibrary />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="templates" element={<WorkoutTemplates />} />
        </Route>
        <Route path="workouts/library/:slug" element={<WorkoutDetail />} />
        <Route path="workouts/exercises/:slug" element={<ExerciseDetail />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="messaging" element={<Messaging />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="templates" element={<Templates />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
