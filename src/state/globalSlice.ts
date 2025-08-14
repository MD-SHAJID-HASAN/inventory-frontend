// state/globalSlice.ts
import { createSlice, } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

interface GlobalState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: GlobalState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setisSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setisSidebarCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
