import { DriverSearchState } from "@/pages/DriverSearchPage";
import { DriverSearchResponse } from "@/types";
import { useQuery } from "react-query";


const API_BASE_URL=import.meta.env.BASE_URL;

export const useSearchDrivers = ( searchState: DriverSearchState ) => {
  
    const createSearchRequest = async (): Promise<DriverSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      //params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  
      const response = await fetch( `${API_BASE_URL}/api/driver?${params.toString()}` );
  
      if (!response.ok) {
        throw new Error("Failed to get drivers");
      }
  
      return response.json();
    };
  
    const { data: results, isLoading } = useQuery( ["searchDrivers", searchState], createSearchRequest );
  
    return { results, isLoading, };
  };

export const useCreateDriver=()=>{

}

export const useUpdateDriver=()=>{

}

export const getDriverById=()=>{

}