export const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user ?? state.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "UPDATE_CREDITS":
      return {
        ...state,
        user: {
          ...state.user,
          credits: action.payload,
        },
      };

    case "UPDATE_PLAN":
      return {
        ...state,
        user: {
          ...state.user,
          plan: action.payload.plan,
          credits: action.payload.credits,
        },
      };

    default:
      return state;
  }
};
