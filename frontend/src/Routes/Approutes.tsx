import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboard from '../pages/Dashboard/Dashboard'

const Approutes = () => {
  return (
    <div>
    <>
    <BrowserRouter>
     <Routes>
      <Route>
        <Route path="/user/login" element={<Login />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/Dashboard' element={<Dashboard/>} />
      </Route>
     </Routes>
    
    </BrowserRouter>
    </>
    </div>
  )
}

export default Approutes