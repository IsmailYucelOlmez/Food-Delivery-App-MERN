import { Driver } from "@/types";
import { Clock, Dot, MapPin } from "lucide-react";

type Props = {
  driver: Driver;
};

const DriverResultCard = ({ driver }: Props) => {
  return (
    <div className="flex justify-between items-center group w-full" >
      <div className="flex justify-between items-center w-3/4">
        <div id="card-content" className="flex flex-col">
          <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline ">
            {driver.user_name || driver.user.name}
          </h3>
        
          <div className="flex flex-row flex-wrap">
            <h6 className="font-light mr-4">Licences</h6>
            {driver.licence_type.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < driver.licence_type.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          
        </div>
        <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {driver.experience_years} years
            </div>
            <div className="flex items-center gap-1">
                <MapPin />
              {driver.location }
            </div>
          </div>
      </div>
    </div>
  );
};

export default DriverResultCard;