import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit , placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 z-20 justify-between flex-row border-2 rounded-full p-1 ${ form.formState.errors.searchQuery && "border-red-500" }`} >
              
        <FormField control={form.control} name="searchQuery" render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} className="border-none shadow-none text-base focus-visible:ring-0" placeholder={placeHolder} />
              </FormControl>
            </FormItem>
        )} />
        
        <Button type="submit" className="rounded-full bg-orange-500"> Search </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
