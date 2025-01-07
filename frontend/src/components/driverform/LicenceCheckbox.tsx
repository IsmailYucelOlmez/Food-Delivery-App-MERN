import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  licence: string;
  field: ControllerRenderProps<FieldValues, "licence_type">;
};

const LicenceCheckbox = ({ licence, field }: Props) => {
  
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value && field.value.includes(licence)}
          onCheckedChange={(checked) => {
            const updatedValue = field.value || [];
            if (checked) {
              field.onChange([...updatedValue, licence]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== licence)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{licence}</FormLabel>
    </FormItem>
  );
};

export default LicenceCheckbox;