import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant,useGetRestaurantOrders } from '@/api/RestaurantApi'
import RestaurantForm from '@/components/forms/restaurant/RestaurantForm'
import OrderItemCard from '@/components/orderstatu/OrderItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useEffect } from 'react';


const RestaurantInfoPage = () => {

  const {createRestaurant,isLoading:createLoading}=useCreateMyRestaurant();
  const {restaurant}=useGetMyRestaurant();
  const {updateRestaurant, isLoading:updateLoading}=useUpdateMyRestaurant();

  const { orders } = useGetRestaurantOrders();

  const isEditing=!!restaurant

  useEffect(()=>{

    window.scrollTo({top:0, behavior:'smooth'})
  },[])

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <RestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={createLoading || updateLoading} />
      </TabsContent>
    </Tabs>  )
}

export default RestaurantInfoPage
