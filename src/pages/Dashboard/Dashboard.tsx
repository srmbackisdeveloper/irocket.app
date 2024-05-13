import DashboardHeader from '../../components/shared/DashboardHeader'
import { DashboardFooter } from '../../components/shared/DashboardFooter'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
   return (
      <>
         <DashboardHeader />
         <Outlet />
         <DashboardFooter />
      </>
   )
}

export default Dashboard
