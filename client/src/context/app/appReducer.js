export const appState = {
  isLoading: true,
  fullHistory: [],
  historyByType: {
    textToImage: [],
    imageUpscaler: [],
    imageToImage: [],
  },
  collections: [],
  notifications: [],
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
    case "SET_COLLECTIONS": {
      return {
        ...state,
        collections: action.payload || [],
      };
    }

    case "ADD_COLLECTION": {
      const updatedCollection = action.payload;
      const exists = (state.collections || []).some((col) => col._id === updatedCollection._id);
      
      const newCollections = exists
        ? state.collections.map((col) => (col._id === updatedCollection._id ? updatedCollection : col))
        : [updatedCollection, ...(state.collections || [])];

      return {
        ...state,
        collections: newCollections,
      };
    }

    case "DELETE_COLLECTION": {
      const collectionId = action.payload;
      return {
        ...state,
        collections: (state.collections || []).filter((col) => col._id !== collectionId),
      };
    }

    case "SET_HISTORY": {
      const fullHistory = action.payload;
      const historyByType = {
        textToImage: fullHistory.filter((item) => !item.type || item.type === "textToImage"),
        imageUpscaler: fullHistory.filter((item) => item.type === "imageUpscaler"),
        imageToImage: fullHistory.filter((item) => item.type === "imageToImage"),
        removeBG: fullHistory.filter((item) => item.type === "removeBG"),
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

    case "ADD_FAVOURITES": {
      const { generationId, imageUrl, isFavourite } = action.payload;
      
      const updateImageArray = (images) =>
        images.map((img) =>
          img.url === imageUrl ? { ...img, isFavourite } : img
        );

      const updateHistoryList = (list) =>
        list.map((item) => {
          if (item._id !== generationId) return item;
          return {
            ...item,
            inputImageUrls: updateImageArray(item.inputImageUrls || []),
            outputImageUrls: updateImageArray(item.outputImageUrls || []),
          };
        });

      return {
        ...state,
        fullHistory: updateHistoryList(state.fullHistory),
        historyByType: {
          textToImage: updateHistoryList(state.historyByType.textToImage || []),
          imageUpscaler: updateHistoryList(state.historyByType.imageUpscaler || []),
          imageToImage: updateHistoryList(state.historyByType.imageToImage || []),
          removeBG: updateHistoryList(state.historyByType.removeBG || []),
        },
      };
    }

    case "DELETE_HISTORY":
      return {
        ...state,
        fullHistory: removeHistory(state.fullHistory, action.payload),
        historyByType: removeHistoryByType(state.historyByType, action.payload),
      };

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload || [],
      };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: (state.notifications || []).map((n) =>
          n._id === action.payload._id ? action.payload : n
        ),
      };

    default:
      return state;
  }
};
