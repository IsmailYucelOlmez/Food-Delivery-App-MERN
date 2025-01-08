import { useParams } from "react-router-dom";
import { useGetDriverById, useGetDriverDetails } from "@/api/DriverApi";
import { useAuth0 } from "@auth0/auth0-react";
import DriverResultCard from "@/components/driversearchpage/DriverResultCard";


export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DriverDetailsPage = () => {
  
  const {user}=useAuth0();  
  const { id } = useParams();
  const { driver, isLoading } = useGetDriverDetails(id);
  

  if (isLoading || !driver) {
    return "Loading...";
  }

  return (
    <div className="lg:w-9/10 mx-auto flex flex-col gap-10">
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-8">
          <span className="text-sm">{user?.email}</span>  
          <DriverResultCard driver={driver} />
          <div className="flex items-center justify-between w-3/4">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold tracking-tight">Listed of Owned Vehicles</span>
                {driver.have_vehicle_type.map((licence) => (
                    <p>{licence}</p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold tracking-tight">Langugages</span>
                {driver.languages.map((licence) => (
                    <p>{licence}</p>
                ))}
            </div>
            
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold tracking-tight">Additional Info</span>
            {driver.additional_info}
          </div>
          
        </div>

        
      </div>
    </div>
  );
};

export default DriverDetailsPage;