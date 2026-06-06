import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer, appState } from "./appReducer";
import { useAuthContext } from "../auth/AuthContext";
import { getHistory } from "../../services/historyService";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appState);
  const { isAuthenticated, accessToken } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchHistory = async () => {
      try {
        const data = await getHistory(accessToken);
        dispatch({ type: "SET_HISTORY", payload: data });
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/library/notification`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "SET_NOTIFICATIONS", payload: data.notifications });
        }
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    fetchHistory();
    fetchNotifications();
  }, [isAuthenticated, accessToken]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return context;
};
