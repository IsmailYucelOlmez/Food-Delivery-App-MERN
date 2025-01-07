import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { Driver } from "@/types";
import { useEffect } from "react";
import DriverDetailsSection from "./driverform/DriverDetailsSection";
import LicenceSection from "./driverform/LicenceTypeSection";
import LanguageSection from "./driverform/LanguageSection";
import VehicleSection from "./driverform/VehicleSection";
import { useAuth0 } from "@auth0/auth0-react";


const formSchema = z
  .object({
    location: z.string({
      required_error: "location is required",
    }),
    experience_years: z.coerce.number({
      required_error: "experience year is required",
      invalid_type_error: "must be a valid number",
    }),
    licence_type: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    have_vehicle_type: z.array(z.string()).optional(),
    languages: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    additional_info: z.string({
      required_error: "additional info is required",
    }),
  })

type DriverFormData = z.infer<typeof formSchema>;

type Props = {
  driver?: Driver;
  onSave: (driverFormData: any) => void;
  isLoading: boolean;
};


const DriverForm = ({onSave, isLoading, driver}:Props) => {

    const { user } = useAuth0();

    const form = useForm<DriverFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          licence_type: [],
          have_vehicle_type:[],
          languages:[],
        },
      });  

      useEffect(() => {
        form.reset(driver);
      }, [driver, form]);
      

    const onSubmit = (formDataJson:DriverFormData) => {

      try{

        console.log(formDataJson)

        const payload = {
          location: formDataJson.location,
          additionalInfo: formDataJson.additional_info,
          experience_years: formDataJson.experience_years,
          licence_type: formDataJson.licence_type,
          have_vehicle_type: formDataJson.have_vehicle_type, // JSON formatında gönderim için yeniden adlandırılabilir
          languages: formDataJson.languages,
          user_name:user?.name
        };
      
        // onSave fonksiyonunu JSON verisiyle çağır
        onSave(payload);

      }catch(error){

        console.log(error);
      }    
    };  

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit( (data) => { onSubmit(data);  }, (errors) => { console.error("Form validation errors:", errors); } )} 
        className="space-y-8 bg-gray-50 p-10 rounded-lg xs:w-full lg:w-3/4 mx-auto">

          <DriverDetailsSection/>
          <Separator/>
          <LicenceSection/>
          <Separator/>
          <LanguageSection/>
          <Separator/>
          <VehicleSection/> 
          
          <Button disabled={isLoading} type="submit" className="bg-orange-500">
            {isLoading ? 'Loading':"Submit"}
          </Button>       

        </form>

    </Form>
  )
}

export default DriverForm
