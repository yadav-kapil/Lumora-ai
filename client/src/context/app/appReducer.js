export const appState = {
  isLoading: true,
  fullHistory: [],
  historyByType: {
    textToImage: [],
    imageUpscaler: [],
    imageToImage: [],
    video: [],
  },
};

const removeHistory = (history, historyId) => {
  return history.filter((item) => item._id !== historyId);
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
    case "SET_HISTORY": {
      const fullHistory = action.payload;
      const historyByType = {
        textToImage: fullHistory.filter((item) => !item.type || item.type === "textToImage"),
        imageUpscaler: fullHistory.filter((item) => item.type === "imageUpscaler"),
        imageToImage: fullHistory.filter((item) => item.type === "imageToImage"),
        video: fullHistory.filter((item) => item.type === "video"),
      };
      return {
        ...state,
        isLoading: false,
        fullHistory,
        historyByType,
      };
    }

    case "ADD_HISTORY_ITEM": {
      const newItem = action.payload;
      const type = newItem.type || "textToImage";
      return {
        ...state,
        fullHistory: [newItem, ...state.fullHistory],
        historyByType: {
          ...state.historyByType,
          [type]: [newItem, ...(state.historyByType[type] || [])],
        },
      };
    }

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
