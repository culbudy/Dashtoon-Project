import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    currIdx:0,
    imageEditModalState : false,
    layoutSize : 'sm',
    filledImages: 0,
    stripImages : new Array(10).fill({prompt: '',text : '',textPos : 'top-right',imageURL : '/imagePlaceholder.png'})
}

const comicPanelSlice = createSlice({
    name: "comicPanelSlice",
    initialState: initialState,
    reducers: {
        toggleImageEditModalState : function (state, action){
            console.log(action.payload);
            if(action.payload) state.currIdx=action.payload;
            if(state.imageEditModalState===true) state.imageEditModalState=false;
            else state.imageEditModalState=true;
        },
        setPrompt: function (state,action){
            state[action.payload.prompt].text=action.payload.value;
        },
        setTextPos: function (state,action){
            state[action.payload.idx].textPos=action.payload.value;
        },
        setText: function (state,action){
            state[action.payload.idx].text=action.payload.value;
        },
        onSubmitClick: function (state,action){
            console.log(action.payload);
            state.stripImages[state.currIdx].imageURL=action.payload.url;
            state.stripImages[state.currIdx].text=action.payload.text;
            // console.log(state.stripImages[action.payload.idx].prompt.length);
            // if(state.stripImages[action.payload.idx].prompt.length===0){
            //     toast("Wow so easy!");
            // }
        }
    }
});

export const {onSubmitClick,toggleImageEditModalState} = comicPanelSlice.actions;

export default comicPanelSlice.reducer;