import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  vehicle: string;
  field: ControllerRenderProps<FieldValues, "have_vehicle_type">;
};

const VehicleCheckbox = ({ vehicle, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value && field.value.includes(vehicle)}
          onCheckedChange={(checked) => {
            const updatedValue = field.value || [];
            if (checked) {
              field.onChange([...updatedValue, vehicle]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== vehicle)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{vehicle}</FormLabel>
    </FormItem>
  );
};

export default VehicleCheckbox;