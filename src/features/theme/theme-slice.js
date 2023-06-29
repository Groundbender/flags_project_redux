import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../helpers/localStorage";

const themeSlice = createSlice({
  name: "@@theme",
  initialState: loadFromLocalStorage() || "light",
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
