// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import connectorsReducer from "./features/connectors/connectorsSlice";

const saveState = (state: RootState) => {
  try {
    const serialized = JSON.stringify(state.connectors.active);
    localStorage.setItem("activeConnectors", serialized);
  } catch (e) {
    console.warn("Failed to save to localStorage", e);
  }
};

export const store = configureStore({
  reducer: {
    connectors: connectorsReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
