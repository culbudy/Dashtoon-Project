import { configureStore } from "@reduxjs/toolkit";
import comicPanelSliceReducer from "./comicPanelSlice";

export const store = configureStore({
    reducer: {
        comicPanel : comicPanelSliceReducer
    }
});