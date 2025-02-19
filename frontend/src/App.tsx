import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './auth/ProtectedRoute'
import RestaurantInfoPage from './pages/RestaurantInfoPage'
import SearchPage from './pages/SearchPage'
import RestaurantDetailsPage from './pages/RestaurantDetailsPage'
import OrderStatusPage from './pages/OrderStatusPage'
import DriverSearchPage from './pages/DriverSearchPage'
import DriverInfoPage from './pages/DriverInfoPage'
import DriverDetailsPage from './pages/DriverDetailsPage'


function App() {

  return (
    <div className='w-full mx-auto flex flex-col gap-8 bg-[#fff]'>
      
      <Header/>  
      
      <Routes>
        <Route path='/' element={<MainPage/>} ></Route>
        <Route path='/search/:city' element={<SearchPage/>} ></Route>
        <Route path='/auth-callback' element={<AuthCallbackPage/>} ></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/user-profile' element={ <UserProfilePage/>} ></Route>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/restaurant-info' element={ <RestaurantInfoPage/>} ></Route>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/order-status' element={ <OrderStatusPage/>} ></Route>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/create-driver' element={ <DriverInfoPage/>} ></Route>
        </Route>     
        <Route path='/search-driver' element={ <DriverSearchPage/>} ></Route>   
        <Route path='/driver-details/:id' element={ <DriverDetailsPage/>} ></Route>
        <Route path='/details/:restaurantId' element={<RestaurantDetailsPage/>} ></Route>
        <Route path='*' element={<Navigate to={"/"}/>} ></Route>
      </Routes>

      <Footer/>
      
    </div>
  )
}

export default App
