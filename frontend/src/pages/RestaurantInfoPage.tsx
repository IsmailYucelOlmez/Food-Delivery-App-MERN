import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/RestaurantApi'
import RestaurantForm from '@/components/forms/restaurant/RestaurantForm'


const RestaurantInfoPage = () => {

  const {createRestaurant,isLoading:createLoading}=useCreateMyRestaurant();
  const {restaurant}=useGetMyRestaurant();
  const {updateRestaurant, isLoading:updateLoading}=useUpdateMyRestaurant();

  const isEditing=!!restaurant

  return (
    <RestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant:createRestaurant} isLoading={createLoading || updateLoading}/>
  )
}

export default RestaurantInfoPage
