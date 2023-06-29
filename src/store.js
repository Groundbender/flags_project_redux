import axios from "axios";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import * as api from "./config";
import { themeReducer } from "./features/theme/theme-slice";
import { controlsReducer } from "./features/controls/controls-slice";
import { countryReducer } from "./features/countries/countries-slice";
import { detailsReducer } from "./features/details/details-slice";
import { saveToLocalStorage } from "./helpers/localStorage";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countryReducer,
    details: detailsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },

      serializableCheck: false,
    }),
});

store.subscribe(() => saveToLocalStorage(store.getState().theme));
