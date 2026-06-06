import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const showLoading = useCallback((title = "Loading...", message = "Please wait while we process your request.") => {
    setLoadingTitle(title);
    setLoadingMessage(message);
    setIsLoadingGlobal(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoadingGlobal(false);
    setLoadingTitle("");
    setLoadingMessage("");
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoadingGlobal,
        loadingTitle,
        loadingMessage,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used inside a LoadingProvider");
  }
  return context;
};
