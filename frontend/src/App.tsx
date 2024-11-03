import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import UserProfilePage from './pages/UserProfilePage'


function App() {

  return (
    <div className='w-full mx-auto flex flex-col gap-8 bg-[#fff]'>
      
      <Header/>  
      
      <Routes>
        <Route path='/' element={<MainPage/>} ></Route>
        <Route path='/home' element={<HomePage/>} ></Route>
        <Route path='/auth-callback' element={<AuthCallbackPage/>} ></Route>
        <Route path='/user-profile' element={<UserProfilePage/>} ></Route>
        <Route path='*' element={<Navigate to={"/"}/>} ></Route>
      </Routes>

      <Footer/>
      
    </div>
  )
}

export default App
