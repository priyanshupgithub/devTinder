import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : [],
    reducers : {
        addFeed : (state,action) => {
            return action.payload;  // Update feed with the payload
        },
        removeFeed: (state,action) => {
            return []; // Reset feed to an empty array
        }
    },
});

export const {addFeed , removeFeed } = feedSlice.actions;
export default feedSlice.reducer;