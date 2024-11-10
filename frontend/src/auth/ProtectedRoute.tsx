import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    
  const {isAuthenticated, isLoading}=useAuth0();

  if(isLoading){
    return <span>Loading...</span>
    
  }

  //Outlet returns component's all children (Outlet's children must be Route component)
  if(isAuthenticated){
    return <Outlet/>
  }
  
  //replace doesn't create a new entry and change current entry
  return <Navigate to={"/"} replace />

}

export default ProtectedRoute
