import Image from "./Image"
import Logo from '../assets/LOGO 1.png'
import Navbar from './Navbar'
import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"


const Header=() => {
  return (
    <header className="flex flex-col w-full ">
      
      <div className="flex justify-around items-center w-full py-4">
        <Link to={"/"}>
        <Image src={Logo} className={"xs:w-28 lg:w-36"} />
        </Link>

        <Navbar/>

        <div className="lg:hidden">
          <Sidebar />
        </div>        
      </div>

    </header>
  )
}



export default Header

