import { useCreateDriver, useGetDriverById, useUpdateDriver } from "@/api/DriverApi";
import DriverForm from "@/components/DriverForm"
import { useEffect } from "react";


const DriverInfoPage = () => {

  const {createDriver,isLoading:createLoading}=useCreateDriver();
  const {driver}=useGetDriverById();
  const {updateDriver, isLoading:updateLoading}=useUpdateDriver();

  const isEditing=!!driver

  
  useEffect(()=>{
  
    window.scrollTo({top:0, behavior:'smooth'})
  },[])  

  return (
    <div>
      <DriverForm  driver={driver} onSave={isEditing ? updateDriver : createDriver} isLoading={createLoading || updateLoading}/>
    </div>
  )
}

export default DriverInfoPage
