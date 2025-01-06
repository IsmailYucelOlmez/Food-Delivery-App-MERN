import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import { languageList } from "../../config/DriverOptions";
import { useFormContext } from "react-hook-form";
import LanguageCheckbox from "./LanguageCheckbox";
  
const LanguageSection = () => {
    const { control } = useFormContext();
  
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Languages</h2>
          <FormDescription>
            Select the Languages 
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {languageList.map((item,index) => (
                  <LanguageCheckbox language={item} field={field} key={index} />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default LanguageSection;