import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import ProtectedRoute from './protectedRoutes'
import Unauthorized from '../pages/Unauthorized/Unauthorized'

const Approutes = () => {
  return (
    <div>
    <>
    <BrowserRouter>
     <Routes>
        <Route path="/user/login" element={<div className='fullscreen-center gradient-left'><Login /></div>} />
        <Route path='/user/register' element={<div className='fullscreen-center gradient-right'><Register /></div>} />
        <Route path='/user/Dashboard' element={<ProtectedRoute><div className='fullscreen-center white-background'><Dashboard/></div></ProtectedRoute>} />
        <Route path='/unauthorized' element={<Unauthorized/>}/>;
     </Routes>
    
    </BrowserRouter>
    </>
    </div>
  )
}

export default Approutes