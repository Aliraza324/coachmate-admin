export const nameToSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

const basePlans = [
  {
    id: 1,
    name: 'Athlete Free',
    type: 'Athlete',
    price: 0,
    billingCycle: 'Monthly',
    users: 1200,
    status: 'Active',
    features: [
      'Basic workout plans',
      'Progress tracking',
      'Limited exercise library',
    ],
  },
  {
    id: 2,
    name: 'Athlete Pro',
    type: 'Athlete',
    price: 9.99,
    billingCycle: 'Monthly',
    users: 1200,
    status: 'Active',
    features: [
      'Personalized workout plans',
      'Nutrition tracking',
      'Progress tracking',
      'Access to premium workouts',
      'Coach messaging',
    ],
  },
  {
    id: 3,
    name: 'Coach Pro',
    type: 'Coach',
    price: 19.99,
    billingCycle: 'Monthly',
    users: 1200,
    status: 'Active',
    features: [
      'Unlimited athletes',
      'Custom program builder',
      'Client messaging',
      'Analytics dashboard',
    ],
  },
  {
    id: 4,
    name: 'Athlete Free',
    type: 'Athlete',
    price: 0,
    billingCycle: 'Monthly',
    users: 1200,
    status: 'Active',
    features: ['Basic workout plans', 'Progress tracking'],
  },
  {
    id: 5,
    name: 'Athlete Free',
    type: 'Athlete',
    price: 0,
    billingCycle: 'Monthly',
    users: 1200,
    status: 'Active',
    features: ['Basic workout plans', 'Progress tracking'],
  },
]

export const plans = basePlans.map((p, i) => ({
  ...p,
  slug: `${nameToSlug(p.name)}-${p.id}`,
}))

export const findPlanBySlug = (slug) => plans.find((p) => p.slug === slug)

export const billingCycles = ['Monthly', 'Quarterly', 'Yearly']
export const planTypes = ['Athlete', 'Coach']

export const payments = [
  {
    id: 'TXN-847392',
    user: 'Ali Khan',
    type: 'Athlete',
    email: 'jessica@email.com',
    phone: '+1 234 567 890',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '14:32 PM',
    method: 'Visa **** 4242',
    billingCycle: 'Monthly',
    country: 'UAE',
    currency: 'USD',
    status: 'Success',
  },
  {
    id: 'TXN-847393',
    user: 'Ali Khan',
    type: 'Athlete',
    email: 'ali@email.com',
    phone: '+1 234 567 891',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '15:02 PM',
    method: 'Visa **** 4242',
    billingCycle: 'Monthly',
    country: 'UAE',
    currency: 'USD',
    status: 'Success',
  },
  {
    id: 'TXN-847394',
    user: 'Ali Khan',
    type: 'Athlete',
    email: 'ali2@email.com',
    phone: '+1 234 567 892',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '15:30 PM',
    method: 'Visa **** 4242',
    billingCycle: 'Monthly',
    country: 'UAE',
    currency: 'USD',
    status: 'Success',
  },
  {
    id: 'TXN-847395',
    user: 'Ali Khan',
    type: 'Athlete',
    email: 'ali3@email.com',
    phone: '+1 234 567 893',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '16:00 PM',
    method: 'Visa **** 4242',
    billingCycle: 'Monthly',
    country: 'UAE',
    currency: 'USD',
    status: 'Success',
  },
  {
    id: 'TXN-847396',
    user: 'Ali Khan',
    type: 'Athlete',
    email: 'ali4@email.com',
    phone: '+1 234 567 894',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '16:45 PM',
    method: 'Visa **** 4242',
    billingCycle: 'Monthly',
    country: 'UAE',
    currency: 'USD',
    status: 'Failed',
  },
]

export const failedPayments = [
  {
    id: 'TXN-847501',
    user: 'John Smith',
    type: 'Athlete',
    email: 'john@email.com',
    phone: '+1 555 010 2020',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '10:15 AM',
    method: 'Visa **** 0007',
    billingCycle: 'Monthly',
    country: 'USA',
    currency: 'USD',
    status: 'Failed',
    reason: 'Card Declined',
  },
  {
    id: 'TXN-847502',
    user: 'John Smith',
    type: 'Athlete',
    email: 'john2@email.com',
    phone: '+1 555 010 2021',
    plan: 'Athlete Pro',
    amount: 9.99,
    date: '12 Apr 2026',
    time: '11:00 AM',
    method: 'Visa **** 0008',
    billingCycle: 'Monthly',
    country: 'USA',
    currency: 'USD',
    status: 'Failed',
    reason: 'Card Declined',
  },
]

export const findPaymentById = (id) =>
  payments.find((p) => p.id === id) || failedPayments.find((p) => p.id === id)

export const paymentStatusStyles = {
  Success: 'bg-emerald-50 text-emerald-600',
  Paid: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-700',
  Failed: 'bg-rose-50 text-rose-500',
}

export const coupons = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  code: 'WELCOME20',
  discount: '20%',
  type: 'Percentage',
  usageLimit: 100,
  used: 45,
  expiryDate: '30 Apr 2026',
}))

export const couponDiscountTypes = ['Percentage', 'Fixed Amount']
export const couponUsageCycles = ['Monthly', 'Quarterly', 'Yearly', 'One-time']

export const findCouponById = (id) =>
  coupons.find((c) => String(c.id) === String(id))
