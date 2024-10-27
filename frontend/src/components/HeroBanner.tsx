import { useState } from "react"
import { useNavigate } from "react-router-dom";
import HeroBanner1 from '../assets/Hero_Banner_01.png'
import HeroBanner2 from '../assets/Hero_Banner_02.png'
import Image from './Image'


const HeroBanner = () => {

    const [location,setLocation]=useState("");
    const navigate=useNavigate();

    const navigatePage=()=>{

        if(location) navigate("/home")
    }

  return (
    <div className="border border-slate-400 w-full mx-auto relative rounded-md flex justify-between px-8 items-center bg-[#FBFBFB] xs:h-64 md:h-96 lg:h-112">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
            <p className="text-[#03081F] xs:text-xs md:text-sm">Order Restaurant food, takeaway and groceries.</p>
            <h3 className="text-[#03081F] font-semibold xs:text-3xl md:text-4xl lg:text-5xl">Feast Your Senses,<br /><span className="text-[#FC8A06]">Fast and Fresh</span></h3>
        </div>

        <div className="flex flex-col gap-2 ">
            <p className="xs:text-xs md:text-sm ">Choose Location</p>
            <div className="flex gap-2 items-center">
                <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className="px-2 py-1 border border-black rounded-lg outline-none xs:text-sm md:text-base" placeholder="location" />
                <button onClick={()=>navigatePage()} className="px-2 py-1 rounded-lg text-white bg-[#FC8A06] xs:text-sm md:text-base">Search</button>
            </div>
        </div>
        
      </div>

      <div className="bg-[#FC8A06] h-9/10 w-1/2 xs:hidden lg:block absolute bottom-0 right-0 rounded-tl-full "></div>

      <Image src={HeroBanner1} className={"xs:hidden lg:block absolute right-1/5 bottom-0 h-96 z-10"}/>
      <Image src={HeroBanner2} className={"xs:hidden lg:block absolute right-1/5 bottom-0 h-72 z-0"}/>
      
      
    </div>
  )
}

export default HeroBanner
