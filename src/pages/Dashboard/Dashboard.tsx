import DashboardHeader from '../../components/shared/DashboardHeader'
import { DashboardFooter } from '../../components/shared/DashboardFooter'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
<<<<<<< HEAD
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
=======
   return (
      <>
         <DashboardHeader />
         <Outlet />
         <DashboardFooter />
      </>
   )
}

export default Dashboard
>>>>>>> b8c00a1b8bc8e60111ed34012023c1fe0b3863b5
