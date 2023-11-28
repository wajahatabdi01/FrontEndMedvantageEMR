import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    iPDUHIDChangeData:""
};
export const IPDUHIDChangeSilce = createSlice({
    name: 'IPDUHIDChangeData',
    initialState,
    reducers: {
        getIPDUHIDChangeData(state, action) {
            state.iPDUHIDChangeData = ""
            state.iPDUHIDChangeData = action.payload
            return  state;
        },
    }
});

// each case under reducers becomes an action
export const {getIPDUHIDChangeData}= IPDUHIDChangeSilce.actions;

export default IPDUHIDChangeSilce.reducer;
