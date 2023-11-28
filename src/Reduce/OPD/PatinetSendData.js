import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    patientSendData:""
};
export const PatinetSendDataSilce = createSlice({
    name: 'PatientSendData',
    initialState,
    reducers: {
        getPatinetSendData(state, action) {
            state.patientSendData = ""
            state.patientSendData = action.payload
            return  state;
        },
    }
});

// each case under reducers becomes an action
export const {getPatinetSendData}= PatinetSendDataSilce.actions;

export default PatinetSendDataSilce.reducer;
