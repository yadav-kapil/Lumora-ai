import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { verifyUser } from "./authAction";
import LoadingScreen from "../../components/LoadingScreen";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyUser(dispatch);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
