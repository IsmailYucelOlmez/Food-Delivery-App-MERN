import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/RestaurantApi'
import RestaurantForm from '@/components/forms/restaurant/RestaurantForm'
import { useEffect } from 'react';


const RestaurantInfoPage = () => {

  const {createRestaurant,isLoading:createLoading}=useCreateMyRestaurant();
  const {restaurant}=useGetMyRestaurant();
  const {updateRestaurant, isLoading:updateLoading}=useUpdateMyRestaurant();

  const isEditing=!!restaurant

  useEffect(()=>{

    window.scrollTo({top:0, behavior:'smooth'})
  },[])

  return (
    <RestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant:createRestaurant} isLoading={createLoading || updateLoading}/>
  )
}

export default RestaurantInfoPage
