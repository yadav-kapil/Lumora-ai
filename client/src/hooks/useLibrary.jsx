import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { useAppContext } from "../context/app/AppContext";
import { useLoading } from "../context/LoadingContext";

const useLibrary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { accessToken } = useAuthContext();
  const { dispatch } = useAppContext();
  const { showLoading, hideLoading } = useLoading();

  const markFavourite = async ({ generationId, imageUrl, isFavourite }) => {
    try {
      setIsLoading(true);
      setError("");
      showLoading(
        isFavourite ? "Adding to Favorites" : "Removing from Favorites",
        isFavourite ? "Marking image as favorite..." : "Removing image from favorites..."
      );

      const res = await fetch("/api/library/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          generationId,
          imageUrl,
          isFavourite,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to update favorite status");
        return {
          success: false,
          message: result.message || "Failed to update favorite status",
        };
      }

      dispatch({
        type: "ADD_FAVOURITES",
        payload: {
          generationId,
          imageUrl,
          isFavourite,
        },
      });

      return {
        success: true,
        message: result.message,
      };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        message: err.message,
      };
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const getFavourites = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/library/favourites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to fetch favorites");
        return {
          success: false,
          message: result.message || "Failed to fetch favorites",
        };
      }

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

  const addToCollection = async ({ collectionName, generationId, imageId }) => {
    try {
      setIsLoading(true);
      setError("");
      showLoading(
        generationId ? "Adding to Collection" : "Creating Collection",
        generationId ? `Saving to ${collectionName}...` : `Creating "${collectionName}"...`
      );

      const res = await fetch("/api/library/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          collectionName,
          generationId,
          imageId,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to add to collection");
        return {
          success: false,
          message: result.message || "Failed to add to collection",
        };
      }

      dispatch({
        type: "ADD_COLLECTION",
        payload: result.data,
      });

      return {
        success: true,
        message: result.message,
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
      hideLoading();
    }
  };

  const getCollections = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/library/collection", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to fetch collections");
        return {
          success: false,
          message: result.message || "Failed to fetch collections",
        };
      }

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

  const renameCollection = async (collectionId, collectionName) => {
    try {
      setIsLoading(true);
      setError("");
      showLoading(
        "Renaming Collection",
        `Updating name to "${collectionName}"...`
      );

      const res = await fetch(`/api/library/collection/${collectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          collectionName,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to rename collection");
        return {
          success: false,
          message: result.message || "Failed to rename collection",
        };
      }

      dispatch({
        type: "ADD_COLLECTION",
        payload: result.data,
      });

      return {
        success: true,
        message: result.message,
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
      hideLoading();
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      setIsLoading(true);
      setError("");
      showLoading(
        "Deleting Collection",
        "Permanently removing folder and updating state..."
      );

      const res = await fetch(`/api/library/collection/${collectionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to delete collection");
        return {
          success: false,
          message: result.message || "Failed to delete collection",
        };
      }

      dispatch({
        type: "DELETE_COLLECTION",
        payload: collectionId,
      });

      return {
        success: true,
        message: result.message,
      };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        message: err.message,
      };
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const removeFromCollection = async (collectionId, imageId) => {
    try {
      setIsLoading(true);
      setError("");
      showLoading(
        "Removing from Collection",
        "Removing image and updating folder details..."
      );

      const res = await fetch(`/api/library/collection/${collectionId}/image/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to remove image from collection");
        return {
          success: false,
          message: result.message || "Failed to remove image from collection",
        };
      }

      dispatch({
        type: "ADD_COLLECTION",
        payload: result.data,
      });

      return {
        success: true,
        message: result.message,
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
      hideLoading();
    }
  };

  return {
    markFavourite,
    getFavourites,
    addToCollection,
    getCollections,
    renameCollection,
    deleteCollection,
    removeFromCollection,
    isLoading,
    error,
    setError,
  };
};

export default useLibrary;
