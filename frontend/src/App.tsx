import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <h1 className='text-red-400'>React</h1>
      <Button>Click</Button>

      <Routes>
        <Route path='' element={""} ></Route>
        <Route path='' element={""} ></Route>
        <Route path='*' element={<Navigate to={"/"}/>} ></Route>
      </Routes>
    </>
  )
}

export default App
