import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ipdpatientData: ""
};
export const IPDPatientDataSilce = createSlice({
    name: 'IPDPatientData',
    initialState,
    reducers: {
        getIPDPatientData(state, action) {
            state.ipdpatientData = ""
            state.ipdpatientData = action.payload
            return state;
        },
    }
});

// each case under reducers becomes an action
export const { getIPDPatientData } = IPDPatientDataSilce.actions;

export default IPDPatientDataSilce.reducer;
