/** @format */

import { createStore, combineReducers } from "redux";
import { todos } from "./reducers/reducer";

// Persits redux state
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Thunk
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = {
  todos,
};

// Perstis Config
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducer);

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
  createStore(
    persistedReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // Add Thunk
    composeWithDevTools(applyMiddleware(thunk))
  );

// Without persist storeage
// export const configureStore = () => createStore(rootReducer);
