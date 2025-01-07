import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import { vehicleList } from "../../config/DriverOptions";
import { useFormContext } from "react-hook-form";
import VehicleCheckbox from "./VehicleCheckbox";
  
const VehicleSection = () => {
    const { control } = useFormContext();
  
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Vehicles</h2>
          <FormDescription>
            Select the Vehicles You Own
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="have_vehicle_type"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {vehicleList.map((item,index) => (
                  <VehicleCheckbox vehicle={item} field={field} key={index} />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default VehicleSection;