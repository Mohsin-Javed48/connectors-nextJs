// store/features/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  active: { [key: number]: boolean };
  
}
const loadState = (): { [key: number]: boolean } => {
  if (typeof window !== "undefined") {
    try {
      const serialized = localStorage.getItem("activeConnectors");
      return serialized ? JSON.parse(serialized) : {};
    } catch (e) {
      console.warn("Failed to load from localStorage", e);
    }
  }
  return {};
};

const initialState: CounterState = {
  active: loadState(),
};

const connectorsSlice = createSlice({
  name: "connectors",
  initialState,
  reducers: {
    toggleActive: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.active[index] = !state.active[index];
    },
    setActive: (
      state,
      action: PayloadAction<{ index: number; value: boolean }>
    ) => {
      const { index, value } = action.payload;
      state.active[index] = value;
    },
  },
});

export const { toggleActive } = connectorsSlice.actions;

export default connectorsSlice.reducer;
