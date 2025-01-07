import { FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const VehicleDetailsSection = () => {
  const { control } = useFormContext();

  if (!control) {
    console.error("Control is undefined. Did you forget to wrap the form in FormProvider?");
    return null;
  }

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>      
      </div>
      <div className="flex gap-4">
        <FormField control={control} name="location" render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />     
        <FormField control={control} name="experience_years" render={({ field }) => (
            <FormItem className="flex-1">
                <FormLabel>Experience Years</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
      </div>
        <FormField control={control} name="additional_info" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Additional Info</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" height={7} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />     

    </div>
  );
};

export default VehicleDetailsSection;
