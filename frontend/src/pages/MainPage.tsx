import HeroBanner from '@/components/HeroBanner'
import DriverAdvert from '@/components/homepage/DriverAdvert'
import RestaurantAdvert from '@/components/homepage/RestaurantAdvert'


const MainPage = () => {
  return (
    <div className='xs:w-9/10 md:w-4/5 lg:w-3/4 mx-auto'>
      
      <HeroBanner/>

      <div className='w-full  flex xs:flex-col lg:flex-row justify-between items-center gap-10 mt-10'>
        <RestaurantAdvert/>
        <DriverAdvert/>
      </div>

    </div>
  )
}

export default MainPage
