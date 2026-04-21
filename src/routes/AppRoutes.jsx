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
import { FoodDatabase } from '@/components/nutrition/FoodDatabase'
import { AddFoodForm } from '@/components/nutrition/AddFoodForm'
import { FoodDetailView } from '@/components/nutrition/FoodDetailView'
import { MealPlans } from '@/components/nutrition/MealPlans'
import { MealPlanDetailView } from '@/components/nutrition/MealPlanDetailView'
import { MealPlanForm } from '@/components/nutrition/MealPlanForm'
import { NutritionTemplates } from '@/components/nutrition/NutritionTemplates'
import { NutritionTemplateDetailView } from '@/components/nutrition/NutritionTemplateDetailView'
import { NutritionTemplateForm } from '@/components/nutrition/NutritionTemplateForm'
import { Messaging } from '@/pages/Messaging'
import { Subscriptions } from '@/pages/Subscriptions'
import { PlansManagement } from '@/components/subscriptions/PlansManagement'
import { Payments } from '@/components/subscriptions/Payments'
import { Coupons } from '@/components/subscriptions/Coupons'
import { PlanDetail } from '@/pages/PlanDetail'
import { PlanForm } from '@/pages/PlanForm'
import { PaymentDetail } from '@/pages/PaymentDetail'
import { CouponForm } from '@/pages/CouponForm'
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
        <Route path="nutrition" element={<Nutrition />}>
          <Route index element={<Navigate to="foods" replace />} />
          <Route path="foods" element={<FoodDatabase />} />
          <Route path="meal-plans" element={<MealPlans />} />
          <Route path="templates" element={<NutritionTemplates />} />
        </Route>
        <Route path="nutrition/foods/new" element={<AddFoodForm />} />
        <Route path="nutrition/foods/:id" element={<FoodDetailView />} />
        <Route path="nutrition/foods/:id/edit" element={<AddFoodForm />} />
        <Route path="nutrition/meal-plans/new" element={<MealPlanForm />} />
        <Route path="nutrition/meal-plans/:id" element={<MealPlanDetailView />} />
        <Route path="nutrition/meal-plans/:id/edit" element={<MealPlanForm />} />
        <Route path="nutrition/templates/new" element={<NutritionTemplateForm />} />
        <Route path="nutrition/templates/:id" element={<NutritionTemplateDetailView />} />
        <Route path="nutrition/templates/:id/edit" element={<NutritionTemplateForm />} />
        <Route path="messaging" element={<Messaging />} />
        <Route path="subscriptions" element={<Subscriptions />}>
          <Route index element={<Navigate to="plans" replace />} />
          <Route path="plans" element={<PlansManagement />} />
          <Route path="payments" element={<Payments />} />
          <Route path="coupons" element={<Coupons />} />
        </Route>
        <Route path="subscriptions/plans/new" element={<PlanForm />} />
        <Route path="subscriptions/plans/:slug" element={<PlanDetail />} />
        <Route path="subscriptions/plans/:slug/edit" element={<PlanForm />} />
        <Route path="subscriptions/payments/:id" element={<PaymentDetail />} />
        <Route path="subscriptions/coupons/new" element={<CouponForm />} />
        <Route path="subscriptions/coupons/:id/edit" element={<CouponForm />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="templates" element={<Templates />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
