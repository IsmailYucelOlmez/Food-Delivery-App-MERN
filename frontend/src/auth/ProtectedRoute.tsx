import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    
  const {isAuthenticated}=useAuth0();

  //Outlet returns component's all children (Outlet's children must be Route component)
  //replace doesn't create a new entry and change current entry
  return isAuthenticated ? ( <Outlet/> ) : ( <Navigate to={"/"} replace />)

}

export default ProtectedRoute
