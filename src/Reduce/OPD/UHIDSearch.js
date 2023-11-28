import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    uhidSearch:""
};
export const UHIDSearchSilce = createSlice({
    name: 'UHIDSearch',
    initialState,
    reducers: {
        getUHIDSearch(state, action) {
            state.uhidSearch = ""
            state.uhidSearch = action.payload
            return  state;
        },
    }
});

// each case under reducers becomes an action
export const {getUHIDSearch}= UHIDSearchSilce.actions;

export default UHIDSearchSilce.reducer;
