import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { Driver } from "@/types";
import { useEffect } from "react";
import DriverDetailsSection from "./driverform/DriverDetailsSection";
import LicenceSection from "./driverform/LicenceTypeSection";
import LanguageSection from "./driverform/LanguageSection";
import VehicleSection from "./driverform/VehicleSection";


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
    have_vehicle_types: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
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
  onSave: (driverFormData: FormData) => void;
  isLoading: boolean;
};


const DriverForm = ({onSave, isLoading, driver}:Props) => {

    const form = useForm<DriverFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          licence_type: [],
          have_vehicle_types:[],
          languages:[],
        },
      });


      useEffect(() => {
        if (!driver) {
          return;
        }
    
      }, [form, driver]);  

    const onSubmit = (formDataJson: DriverFormData) => {
        const formData = new FormData();
    
        formData.append("location", formDataJson.location);
        formData.append("additionalInfo", formDataJson.additional_info);
    
        formData.append(
          "experienceYears",
          (formDataJson.experience_years).toString()
        );
        
        formDataJson.licence_type.forEach((licence, index) => {
          formData.append(`licences[${index}]`, licence);
        });

        formDataJson.have_vehicle_types.forEach((vehicle, index) => {
          formData.append(`vehicles[${index}]`, vehicle);
        });

        formDataJson.languages.forEach((language, index) => {
          formData.append(`languages[${index}]`, language);
        });
        
    
        onSave(formData);
    };  

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg xs:w-full lg:w-3/4 mx-auto">

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
