import DashboardHeader from '../../components/Dashboard/DashboardHeader'
import { DashboardFooter } from '../../components/Dashboard/DashboardFooter'
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
