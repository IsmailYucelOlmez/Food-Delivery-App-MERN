import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { AuthProfile } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

// Auth Service API endpoints
export const useGetProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProfileRequest = async (): Promise<AuthProfile> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  };

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery("fetchProfile", getProfileRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { profile, isLoading };
};

type UpdateProfileRequest = {
  name?: string;
  email?: string;
};

export const useUpdateProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateProfileRequest = async (formData: UpdateProfileRequest): Promise<AuthProfile> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return response.json();
  };

  const {
    mutateAsync: updateProfile,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateProfileRequest);

  if (isSuccess) {
    toast.success("Profile updated successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateProfile, isLoading };
};

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export const useChangePassword = () => {
  const { getAccessTokenSilently } = useAuth0();

  const changePasswordRequest = async (formData: ChangePasswordRequest) => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    return response.json();
  };

  const {
    mutateAsync: changePassword,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(changePasswordRequest);

  if (isSuccess) {
    toast.success("Password changed successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { changePassword, isLoading };
};

export const useRefreshToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const refreshTokenRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return response.json();
  };

  const {
    mutateAsync: refreshToken,
    isLoading,
    error,
  } = useMutation(refreshTokenRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { refreshToken, isLoading };
};

export const useLogout = () => {
  const { getAccessTokenSilently } = useAuth0();

  const logoutRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    return response.json();
  };

  const {
    mutateAsync: logout,
    isLoading,
    error,
  } = useMutation(logoutRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { logout, isLoading };
};
