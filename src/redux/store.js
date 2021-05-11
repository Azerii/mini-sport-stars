import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer, { initialState } from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "mini_sports_stars:root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(reduxThunk)
);
let persistor = persistStore(store);

export { store, persistor };
