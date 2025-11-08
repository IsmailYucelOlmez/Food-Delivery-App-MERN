import { elasticsearchClient, RESTAURANT_INDEX } from '../config/elasticsearch';
import Restaurant from '../models/restaurant';

export interface RestaurantDocument {
  restaurantId: string;
  userId: string;
  restaurantName: string;
  city: string;
  country: string;
  cuisines: string[];
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  imageUrl: string;
  lastUpdated: Date;
  menuItems: Array<{
    _id: string;
    name: string;
    price: number;
  }>;
}

// Index a restaurant in Elasticsearch
export const indexRestaurant = async (restaurant: any) => {
  try {
    const document: RestaurantDocument = {
      restaurantId: restaurant._id.toString(),
      userId: restaurant.user?.toString() || '',
      restaurantName: restaurant.restaurantName,
      city: restaurant.city,
      country: restaurant.country,
      cuisines: restaurant.cuisines || [],
      deliveryPrice: restaurant.deliveryPrice,
      estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
      imageUrl: restaurant.imageUrl,
      lastUpdated: restaurant.lastUpdated,
      menuItems: restaurant.menuItems?.map((item: any) => ({
        _id: item._id?.toString() || '',
        name: item.name,
        price: item.price,
      })) || [],
    };

    await elasticsearchClient.index({
      index: RESTAURANT_INDEX,
      id: restaurant._id.toString(),
      document,
    });

    console.log(`Restaurant indexed in Elasticsearch: ${restaurant._id}`);
  } catch (error) {
    console.error('Failed to index restaurant in Elasticsearch:', error);
    // Don't throw error to prevent breaking the main flow
  }
};

// Update a restaurant in Elasticsearch
export const updateRestaurantIndex = async (restaurant: any) => {
  try {
    const document: RestaurantDocument = {
      restaurantId: restaurant._id.toString(),
      userId: restaurant.user?.toString() || '',
      restaurantName: restaurant.restaurantName,
      city: restaurant.city,
      country: restaurant.country,
      cuisines: restaurant.cuisines || [],
      deliveryPrice: restaurant.deliveryPrice,
      estimatedDeliveryTime: restaurant.estimatedDeliveryTime,
      imageUrl: restaurant.imageUrl,
      lastUpdated: restaurant.lastUpdated,
      menuItems: restaurant.menuItems?.map((item: any) => ({
        _id: item._id?.toString() || '',
        name: item.name,
        price: item.price,
      })) || [],
    };

    await elasticsearchClient.index({
      index: RESTAURANT_INDEX,
      id: restaurant._id.toString(),
      document,
    });

    console.log(`Restaurant updated in Elasticsearch: ${restaurant._id}`);
  } catch (error) {
    console.error('Failed to update restaurant in Elasticsearch:', error);
    // Don't throw error to prevent breaking the main flow
  }
};

// Delete a restaurant from Elasticsearch
export const deleteRestaurantIndex = async (restaurantId: string) => {
  try {
    await elasticsearchClient.delete({
      index: RESTAURANT_INDEX,
      id: restaurantId,
    });

    console.log(`Restaurant deleted from Elasticsearch: ${restaurantId}`);
  } catch (error) {
    console.error('Failed to delete restaurant from Elasticsearch:', error);
    // Don't throw error to prevent breaking the main flow
  }
};

// Sync all restaurants from MongoDB to Elasticsearch
export const syncAllRestaurantsToElasticsearch = async () => {
  try {
    const restaurants = await Restaurant.find({}).lean();
    console.log(`Syncing ${restaurants.length} restaurants to Elasticsearch...`);

    for (const restaurant of restaurants) {
      await indexRestaurant(restaurant);
    }

    console.log('All restaurants synced to Elasticsearch successfully');
  } catch (error) {
    console.error('Failed to sync restaurants to Elasticsearch:', error);
    throw error;
  }
};

