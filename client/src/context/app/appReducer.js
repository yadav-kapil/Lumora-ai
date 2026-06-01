export const appState = {
  fullHistory: [],
  historyByType: {
    textToImage: [],
    imageUpscaler: [],
    imageToImage: [],
    video: [],
  },
};

const removeHistory = (history, historyId) => {
  return history.filter((item) => item._id !== historyId );
};

const removeHistoryByType = (historyByType, historyId) => {
  return Object.fromEntries(
    Object.entries(historyByType).map(([type, history]) => [
      type,
      removeHistory(history, historyId),
    ]),
  );
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_FULL_HISTORY":
      return {
        ...state,
        fullHistory: action.payload,
      };

    case "SET_HISTORY_BY_TYPE":
      return {
        ...state,
        historyByType: {
          ...state.historyByType,
          [action.payload.type]: action.payload.history,
        },
      };

    case "ADD_HISTORY_ITEM":
      return {
        ...state,
        fullHistory: [action.payload, ...state.fullHistory],
        historyByType: {
          ...state.historyByType,
          [action.payload.type]: [
            action.payload,
            ...(state.historyByType[action.payload.type] || []),
          ],
        },
      };

    case "DELETE_HISTORY":
      return {
        ...state,
        fullHistory: removeHistory(state.fullHistory, action.payload),
        historyByType: removeHistoryByType(state.historyByType, action.payload),
      };

    default:
      return state;
  }
};
