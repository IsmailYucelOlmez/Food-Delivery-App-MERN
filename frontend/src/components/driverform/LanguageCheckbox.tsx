import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  language: string;
  field: ControllerRenderProps<FieldValues, "languages">;
};

const LanguageCheckbox = ({ language, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value && field.value.includes(language)}
          onCheckedChange={(checked) => {
            const updatedValue = field.value || [];
            if (checked) {
              field.onChange([...updatedValue, language]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== language)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{language}</FormLabel>
    </FormItem>
  );
};

export default LanguageCheckbox;