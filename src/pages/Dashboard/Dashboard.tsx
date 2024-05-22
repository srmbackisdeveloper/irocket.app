import DashboardHeader from '../../components/shared/DashboardHeader'
import { DashboardFooter } from '../../components/shared/DashboardFooter'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
   document.title = 'Панель управления';

   return (
      <div className="flex flex-col min-h-screen">
         <DashboardHeader />
         <div className="flex-grow">
            <Outlet />
         </div>
         <DashboardFooter />
      </div>
   )
}

export default Dashboard
