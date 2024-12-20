import Image from "../Image"
import RestaurantAdvertBg from '../../assets/RestaurantAdvert.png'
import { useNavigate } from "react-router-dom"

const RestaurantAdvert = () => {

  const navigate=useNavigate();

  return (
    <div className="w-full relative rounded-lg">
      <Image src={RestaurantAdvertBg} className="w-full"/>

      <div className="bg-[linear-gradient(45deg,_hsla(229,82%,7%,1)_0%,_hsla(0,0%,100%,0)_50%)] absolute top-0 left-0 w-full h-full rounded-lg"></div> 

      
      <div className="absolute top-0 left-8 xs:p-1 md:p-2 bg-[#fff] rounded-b-lg">
        <p className="xs:text-xs md:text-sm font-semibold">Earn more with lower fees</p>
      </div>

      <div className="absolute bottom-6 left-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
            <p className="text-[#FC8A06] xs:text-xs md:text-sm">Sign up as a business</p>
            <h5 className="text-[#fff] xs:text-lg md:text-3xl font-semibold">Partner with us</h5>
        </div>
        
        <button onClick={()=>navigate("/restaurant-info")} className="bg-[#FC8A06] text-white xs:px-2 md:px-3 xs:py-1 md:py-2 rounded-full xs:text-xs md:text-sm lg:text-base">Get Started</button>
      </div>
      
    </div>
  )
}

export default RestaurantAdvert
