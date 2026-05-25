import { useState } from "react";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const signup = async (formData) => {
    try {
      setIsLoading(true);

      setError("");

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/register`,
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
