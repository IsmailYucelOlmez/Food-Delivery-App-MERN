import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.name}
            </span>
          ) : ( 
            <span> Welcome to MernEats.com!</span>
          )} 
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/order-status" className="flex bg-white items-center font-bold hover:text-orange-500">
                Order Status
              </Link>
              <Link to="/restaurant-info" className="flex bg-white items-center font-bold hover:text-orange-500">
                My Restaurant
              </Link>
              <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
              </Link>
              <Button onClick={() => logout()} className="flex items-center px-3 font-bold hover:bg-gray-500">
                Log Out
              </Button>
            </>
          ) : ( 
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )} 
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
