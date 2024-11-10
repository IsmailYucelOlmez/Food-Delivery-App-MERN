import { useCreateMyRestaurant, useGetMyRestaurant } from '@/api/RestaurantApi'
import RestaurantForm from '@/components/forms/restaurant/RestaurantForm'


const RestaurantInfoPage = () => {

  const {createRestaurant,isLoading}=useCreateMyRestaurant();
  const {restaurant}=useGetMyRestaurant();

  return (
    <RestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isLoading}/>
  )
}

export default RestaurantInfoPage
