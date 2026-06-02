import { useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { validateForm } from "../utils/authValidation";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    const validationErrors = validateForm(formData);
    const errorKeys = Object.keys(validationErrors);

    if (errorKeys.length > 0) {
      const firstError = validationErrors[errorKeys[0]];
      setError(firstError);
      return {
        success: false,
        message: firstError,
      };
    }

    try {
      setIsLoading(true);

      setError("");

      const res = await fetch(
        `/api/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message);
        return {
          success: false,
          message: data.message,
        };
      }

      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          accessToken: data.accessToken,
        },
      });

      return {
        success: true,
        data,
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
    signup,
    isLoading,
    error,
    setError,
  };
};

export default useSignup;
