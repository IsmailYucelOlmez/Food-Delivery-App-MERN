
export type User={

    _id:string,
    email:string,
    name:string,
    addressLine1:string,
    city:string,
    country:string,
}

export type Driver={

  _id: string,
  user: string,  
  user_name:string,
  location: string,
  licence_type: string[],
  experience_years: number, 
  languages: string[],
  have_vehicle_type: string[], 
  additional_info: string,
}

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
  };
  
  export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
  };

  export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type DriverSearchResponse = {
  data: Driver[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};