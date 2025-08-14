import Sidebar from "../../layouts/Sidebar/Sidebar"
import Profile from "../../layouts/profile/profile"
import HealthDashboard from "../../components/GoalsProgress/GoalsProgress"
import Header from "../../layouts/Header/Header"

const Dashboard = () => {
  return (
    <>
     <Sidebar />
     <Header />
     <HealthDashboard />
     <Profile /> 
    </>
  )
} 

export default Dashboard