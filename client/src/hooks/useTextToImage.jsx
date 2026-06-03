import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { useAppContext } from "../context/app/AppContext";
import { validateTextToImage } from "../utils/textToImageValidation";

const useTextToImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken, user, dispatch: authDispatch } = useAuthContext();
  const { dispatch } = useAppContext();

  const generateImage = async (promptObj) => {
    const currentCredits = user?.credits ?? 0;
    const validationErrors = validateTextToImage(promptObj, currentCredits);
    
    if (validationErrors.credits) {
      setError(validationErrors.credits);
      return {
        success: false,
        message: validationErrors.credits,
      };
    }

    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      Object.entries(promptObj).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch("/api/generation/text-to-image", {
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
