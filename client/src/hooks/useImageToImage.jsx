import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { useAppContext } from "../context/app/AppContext";
import { validateImageToImage } from "../utils/imageToImageValidation";

const useImageToImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken, user, dispatch: authDispatch } = useAuthContext();
  const { dispatch } = useAppContext();

  const generateImage = async (payload) => {
    const provider = payload.provider;
    const model = payload.model;
    const quality = payload.quality;
    const numberOfImages = parseInt(payload.numberOfImages || "1");
    const currentCredits = user?.credits ?? 0;

    const validationErrors = validateImageToImage(
      provider,
      model,
      quality,
      numberOfImages,
      currentCredits,
    );

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
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "inputImages" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("inputImages", file);
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await fetch("/api/generation/image-to-image", {
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
    generateImage,
    isLoading,
    error,
    setError,
  };
};

export default useImageToImage;
