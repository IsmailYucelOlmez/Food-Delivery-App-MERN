import Image from "./Image"
import Logo from '../assets/LOGO 1.png'
import { Link } from "react-router-dom"
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <div className="bg-[rgb(217,217,217)] py-10 text-[#03081F] w-full">
      <div className="flex flex-col md:flex-row xs:justify-center md:justify-around items-center xs:gap-8 md:gap-0">

        <div className="flex flex-col xs:items-center gap-3">
          <Image src={Logo} className="xs:w-36 lg:w-42"/>
          <Link to={"/privacy-policy"} className="xs:text-xs lg:text-sm underline">Privacy Police</Link>
          <p className="xs:text-xs lg:text-sm">@Copyright 2024, Tüm Hakları Saklıdır </p>
        </div>
        
          
        <div className="flex flex-col xs:gap-2 lg:gap-4">
          <p className="font-bold tracking-tight text-lg ">Social Media</p>

          <div className="flex items-center justify-center gap-5">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>

        <div className="flex flex-col xs:gap-2 lg:gap-4">
          <p className="font-bold tracking-tight text-lg text-center">Contact</p>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <Mail />
              <p className="xs:text-xs lg:text-sm">info@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              <p className="xs:text-xs lg:text-sm">0 538 021 51 67</p>
            </div>
            
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
