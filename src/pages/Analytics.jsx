import OverView from '@/components/analytics/OverView'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

export function Analytics() {
  return (
   <div className='bg-white rounded-[12px] border border-border shadow-sm overflow-hidden p-4'>
    <PlaceholderPage
      title="Analytics Overview"
      description="Monitor platform performance, user activity, and system health in real time."
    />
     <OverView/>
   </div>
  )
}
