import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { useAppContext } from "../context/app/AppContext";

const useUpscaler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken, dispatch: authDispatch } = useAuthContext();
  const { dispatch } = useAppContext();

  const upscaleImage = async (payload) => {
    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "inputImage" && value) {
          formData.append("inputImage", value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await fetch("/api/generation/upscale", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message);
        return {
          success: false,
          message: result.message,
        };
      }

      const historyItem = result.data.historyItem;
      const creditsRemaining = result.data.creditsRemaining;

      dispatch({
        type: "ADD_HISTORY_ITEM",
        payload: historyItem,
      });

      authDispatch({
        type: "UPDATE_CREDITS",
        payload: creditsRemaining,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        message: err.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upscaleImage,
    isLoading,
    error,
    setError,
  };
};

export default useUpscaler;
