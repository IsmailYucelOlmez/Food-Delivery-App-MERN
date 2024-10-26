import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";


const Navbar = () => {
    const isAuthenticated=false;
  return (
    <nav className="flex space-x-2 items-center xs:hidden lg:flex">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          {/* <UsernameMenu /> */}
        </>
      ) : (
        <Button
          variant="secondary"
          className="bg-[#03081F] rounded-lg px-2 py-1 border flex items-center justify-center gap-2 text-white hover:text-[#03081F] border-white hover:border-[#03081F]"
        //   onClick={async () => await loginWithRedirect()}
        >
          <LogIn size={"18px"} />
          Log In / Sıgn Up
        </Button>
      )}
    </nav>
  )
}

export default Navbar
