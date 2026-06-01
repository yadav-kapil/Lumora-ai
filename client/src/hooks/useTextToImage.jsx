import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { useAppContext } from "../context/app/AppContext";

const useTextToImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken } = useAuthContext();
  const { dispatch } = useAppContext();

  const generateImage = async (promptObj) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ promptObj }),
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

      dispatch({
        type: "ADD_HISTORY_ITEM",
        payload: historyItem,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        message: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    isLoading,
    error,
    setError,
  };
};

export default useTextToImage;
