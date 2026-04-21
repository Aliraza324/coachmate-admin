export const nameToSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

const baseFoods = [
  { 
    id: 1, 
    name: 'Chicken Breast', 
    calories: 165, 
    protein: 31, 
    carbs: 0, 
    fat: 3.1,
    category: 'Protein',
    servingSize: '100g',
    description: 'Lean protein source ideal for muscle building diets.',
    vedioLink: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&h=675&fit=crop'
  },
  { 
    id: 2, 
    name: 'Brown Rice', 
    calories: 165, 
    protein: 3.5, 
    carbs: 35, 
    fat: 1.8,
    category: 'Carbs',
    servingSize: '100g cooked',
    description: 'Complex carbohydrate with fiber for sustained energy.',
    vedioLink: 'https://images.unsplash.com/photo-1586165368123-a449129ff618?w=1200&h=675&fit=crop'
  },
  { 
    id: 3, 
    name: 'Boiled Eggs', 
    calories: 155, 
    protein: 13, 
    carbs: 1.1, 
    fat: 11,
    category: 'Protein',
    servingSize: '1 medium egg',
    description: 'Complete protein with choline for brain health.',
    vedioLink: 'https://images.unsplash.com/photo-1609318667499-9d8a4c926bc1?w=1200&h=675&fit=crop'
  },
  { 
    id: 4, 
    name: 'Sweet Potato', 
    calories: 86, 
    protein: 1.6, 
    carbs: 20, 
    fat: 0.1,
    category: 'Carbs',
    servingSize: '100g',
    description: 'Rich in beta-carotene and antioxidants for overall health.',
    vedioLink: 'https://images.unsplash.com/photo-1585518419759-5ccc86ca3a88?w=1200&h=675&fit=crop'
  },
  { 
    id: 5, 
    name: 'Almonds', 
    calories: 579, 
    protein: 21, 
    carbs: 22, 
    fat: 50,
    category: 'Healthy Fat',
    servingSize: '28g (handful)',
    description: 'Great source of healthy fats and vitamin E.',
    vedioLink: 'https://images.unsplash.com/photo-1585706905088-f8e7f59beaa0?w=1200&h=675&fit=crop'
  },
]

export const foods = baseFoods.map((f) => ({
  ...f,
  slug: `${nameToSlug(f.name)}-${f.id}`,
}))

export const findFoodBySlug = (slug) => foods.find((f) => f.slug === slug)

export const foodsTotal = 12458

// Meal Plans Data
const baseMealPlans = [
  {
    id: 1,
    name: 'Fat Loss Meal Plan',
    category: 'Pre-Built',
    goal: 'Weight Loss',
    calories: '1800 kcal/day',
    mealsPerWeek: 4,
    duration: '4 Weeks',
    servingSize: '100g',
    description: 'Balanced calorie deficit plan for fat loss.',
    target: 'Reduce body fat while maintaining muscle mass.',
    meals: [
      { id: 1, name: 'Breakfast', foods: 'Eggs, Toast, Banana', calories: '400 kcal' },
      { id: 2, name: 'Breakfast', foods: 'Eggs, Toast, Banana', calories: '400 kcal' },
    ]
  },
  {
    id: 2,
    name: 'Muscle Gain',
    category: 'Custom',
    goal: 'Muscle Building',
    calories: '3000 kcal/day',
    mealsPerWeek: 6,
    duration: '8 Weeks',
    servingSize: '150g',
    description: 'High protein plan for muscle hypertrophy.',
    target: 'Build lean muscle mass with progressive overload.',
    meals: [
      { id: 1, name: 'Breakfast', foods: 'Oatmeal, Eggs, Almonds', calories: '600 kcal' },
      { id: 2, name: 'Lunch', foods: 'Chicken, Brown Rice, Broccoli', calories: '700 kcal' },
    ]
  },
  {
    id: 3,
    name: 'Keto Diet',
    category: 'Popular',
    goal: 'Fat Loss',
    calories: '2000 kcal/day',
    mealsPerWeek: 7,
    duration: '12 Weeks',
    servingSize: '120g',
    description: 'Low-carb, high-fat ketogenic meal plan.',
    target: 'Achieve metabolic ketosis for rapid fat loss.',
    meals: [
      { id: 1, name: 'Breakfast', foods: 'Bacon, Eggs, Avocado', calories: '550 kcal' },
    ]
  },
  {
    id: 4,
    name: 'Fat Loss Meal Plan',
    category: 'Weight Loss',
    goal: 'Weight Loss',
    calories: '1800 kcal/day',
    mealsPerWeek: 5,
    duration: '4 Weeks',
    servingSize: '100g',
    description: 'Balanced calorie deficit plan for fat loss.',
    target: 'Reduce body fat while maintaining muscle mass.',
    meals: []
  },
  {
    id: 5,
    name: 'Fat Loss Meal Plan',
    category: 'Weight Loss',
    goal: 'Weight Loss',
    calories: '1800 kcal/day',
    mealsPerWeek: 5,
    duration: '4 Weeks',
    servingSize: '100g',
    description: 'Balanced calorie deficit plan for fat loss.',
    target: 'Reduce body fat while maintaining muscle mass.',
    meals: []
  },
]

export const mealPlans = baseMealPlans.map((mp) => ({
  ...mp,
  slug: `${nameToSlug(mp.name)}-${mp.id}`,
}))

export const findMealPlanById = (id) => mealPlans.find((mp) => mp.id === parseInt(id))

export const mealPlansTotal = 154

// Nutrition Templates Data
const baseTemplates = [
  {
    id: 1,
    name: 'Basic Weight Loss',
    goal: 'Fat Loss',
    type: 'Pre-Built',
    mealsCount: 4,
    calories: '1800 kcal',
    createdBy: 'Admin',
    description: 'Calorie-controlled diet designed for gradual fat loss.',
    focus: 'High protein, moderate carbs',
    meals: [
      { id: 1, name: 'Breakfast', foods: 'Eggs, Oat', calories: '400 kcal' },
      { id: 2, name: 'Breakfast', foods: 'Eggs, Oat', calories: '400 kcal' },
    ]
  },
  {
    id: 2,
    name: 'Balanced Diet',
    goal: 'General',
    type: 'Custom',
    mealsCount: 4,
    calories: '1800 kcal',
    createdBy: 'Admin',
    description: 'Balanced macronutrient template for general health.',
    focus: 'Even distribution of macros',
    meals: []
  },
  {
    id: 3,
    name: 'Basic Weight Loss',
    goal: 'Fat Loss',
    type: 'Pre-Built',
    mealsCount: 4,
    calories: '1800 kcal',
    createdBy: 'Admin',
    description: 'Calorie-controlled diet designed for gradual fat loss.',
    focus: 'High protein, moderate carbs',
    meals: []
  },
  {
    id: 4,
    name: 'Basic Weight Loss',
    goal: 'Fat Loss',
    type: 'Pre-Built',
    mealsCount: 4,
    calories: '1800 kcal',
    createdBy: 'Admin',
    description: 'Calorie-controlled diet designed for gradual fat loss.',
    focus: 'High protein, moderate carbs',
    meals: []
  },
  {
    id: 5,
    name: 'Basic Weight Loss',
    goal: 'Fat Loss',
    type: 'Pre-Built',
    mealsCount: 4,
    calories: '1800 kcal',
    createdBy: 'Admin',
    description: 'Calorie-controlled diet designed for gradual fat loss.',
    focus: 'High protein, moderate carbs',
    meals: []
  },
]

export const nutritionTemplates = baseTemplates.map((t) => ({
  ...t,
  slug: `${nameToSlug(t.name)}-${t.id}`,
}))

export const findTemplateById = (id) => nutritionTemplates.find((t) => t.id === parseInt(id))

export const templatesTotal = 12458
