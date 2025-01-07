import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import { licenceList } from "../../config/DriverOptions";
import { useFormContext } from "react-hook-form";
import LicenceCheckbox from "./LicenceCheckbox";
  
const LicencesSection = () => {
    const { control } = useFormContext();
  
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Licences</h2>
          <FormDescription>
            Select the Licences 
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="licence_type"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {licenceList.map((item,index) => (
                  <LicenceCheckbox licence={item} field={field} key={index} />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default LicencesSection;