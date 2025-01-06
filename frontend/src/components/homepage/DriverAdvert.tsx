import Image from "../Image"
import DriverAdvertBg from '../../assets/DriverAdvert.png'
import { useNavigate } from "react-router-dom"

const DriverAdvert = () => {

  const navigate=useNavigate();
  
  return (
    <div className="w-full relative rounded-lg">
       <Image src={DriverAdvertBg} className="w-full z-0 "/> 

       <div className="bg-[linear-gradient(45deg,_hsla(229,82%,7%,1)_0%,_hsla(0,0%,100%,0)_50%)] absolute top-0 left-0 w-full h-full rounded-lg"></div> 

      
      <div className="absolute top-0 left-8 xs:p-1 md:p-2 bg-[#fff] rounded-b-lg">
        <p className="xs:text-xs md:text-sm font-semibold">Avail exclusive perks</p>
      </div>

      <div className="absolute bottom-6 left-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
            <p className="text-[#FC8A06] xs:text-sm md:text-sm">Sign up as a rider</p>
            <h5 className="text-[#fff] xs:text-lg md:text-3xl font-semibold">Ride with us</h5>
        </div>
        
        <button onClick={()=>navigate("/create-driver")} className="bg-[#FC8A06] text-white xs:px-2 md:px-3 xs:py-1 md:py-2 xs:text-xs md:text-sm lg:text-base rounded-full">Get Started</button>
      </div>

    </div>
  )
}

export default DriverAdvert
