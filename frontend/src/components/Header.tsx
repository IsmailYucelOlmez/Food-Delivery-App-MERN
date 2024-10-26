import Image from "./Image"
import Logo from '../assets/LOGO 1.png'
import Navbar from './Navbar'
import { CircleChevronDown, MapPin, ShoppingBasket } from "lucide-react"
import Sidebar from "./Sidebar"


const Header=() => {
  return (
    <header className="flex flex-col w-full ">
      <div className="flex justify-around items-center bg-[#FAFAFA] border border-b-slate-400 h-12 ">
        
        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-center gap-1">
            <MapPin className="xs:w-5 md:w-6 xs:h-5 md:h-6"  color="black"/>
            <p className="xs:text-xs md:text-sm text-[#03081F]">Merkez/Elazığ</p>
          </div>   
          <button className="underline text-[#FC8A06] text-xs">Change Location</button>
        </div>
        
        <div className="flex items-center bg-[#028643] text-white px-2 rounded-md divide-x text-sm ">
            <ShoppingBasket color="white" className="xs:w-7 lg:w-9 xs:h-7 lg:h-9 xs:p-0.5 lg:pr-3"/>
            <p className="px-3 xs:hidden lg:flex text-sm">3 items</p>
            <p className="px-3 xs:hidden lg:flex text-sm">279.99₺</p>
            <CircleChevronDown color="white"  className="h-9 w-9 pl-3 xs:hidden lg:flex"/>
        </div>

        {/* bucket dropdown */}
      </div>
      <div className="flex justify-around items-center w-full py-4">
        <Image src={Logo} className={"xs:w-28 lg:w-36"} />

        <Navbar/>

        <div className="lg:hidden">
          <Sidebar />
        </div>        

        
      </div>
    </header>
  )
}



export default Header

