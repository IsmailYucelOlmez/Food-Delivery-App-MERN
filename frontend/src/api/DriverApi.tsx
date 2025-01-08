import { DriverSearchState } from "@/pages/DriverSearchPage";
import { Driver, DriverSearchResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";;
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const useSearchDrivers = ( searchState: DriverSearchState ) => {
  
    const createSearchRequest = async (): Promise<DriverSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("licence",searchState.licence_type.join(","))
      params.set("page", searchState.page.toString());

  
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
  const { getAccessTokenSilently } = useAuth0();
  
    const createMyDriverRequest = async ( driverFormData:any ): Promise<Driver> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/driver`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverFormData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create driver");
      }
  
      return response.json();
    };
  
    const { mutate: createDriver, isLoading, isSuccess, error } = useMutation(createMyDriverRequest);
  
    if (isSuccess) {
      toast.success("Driver created!");
    }
  
    if (error) {
      toast.error("Unable to update driver");
    }
  
    return { createDriver, isLoading };

}

export const useUpdateDriver=()=>{

  const { getAccessTokenSilently } = useAuth0();
    
      const updateDriverRequest = async ( driverFormData: any ): Promise<Driver> => {
       
        const accessToken = await getAccessTokenSilently();
    
        const response = await fetch(`${API_BASE_URL}/api/driver`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type":"application/json",
          },
          body: JSON.stringify(driverFormData),
        });
    
        if (!response) {
          throw new Error("Failed to update driver");
        }
    
        return response.json();
      };
    
      const { mutate: updateDriver, isLoading, error, isSuccess } = useMutation(updateDriverRequest);
    
      if (isSuccess) {
        toast.success("Driver Updated");
      }
    
      if (error) {
        toast.error("Unable to update driver");
      }
    
      return { updateDriver, isLoading }
}

export const useGetDriverById=()=>{
   const { getAccessTokenSilently } = useAuth0();
  
    const getMyDriverRequest = async (): Promise<Driver> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/driver/byId`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get driver");
      }
      return response.json();
    };
  
    const { data: driver, isLoading } = useQuery( "fetchMyDriver", getMyDriverRequest );
  
    return { driver, isLoading };
}

export const useGetDriverDetails=(id?:string)=>{
  const { getAccessTokenSilently } = useAuth0();
 
   const getDriverDetailsRequest = async (): Promise<Driver> => {
     const accessToken = await getAccessTokenSilently();
 
     const response = await fetch(`${API_BASE_URL}/api/driver/details/${id}`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     });
 
     if (!response.ok) {
       throw new Error("Failed to get driver");
     }
     return response.json();
   };
 
   const { data: driver, isLoading } = useQuery( "fetchDriverDetails", getDriverDetailsRequest, {enabled: !!id,} );
 
   return { driver, isLoading };
}