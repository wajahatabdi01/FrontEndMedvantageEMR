import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    patientData:""
};
export const PatientDataSilce = createSlice({
    name: 'PatientData',
    initialState,
    reducers: {
        getPatientData(state, action) {
            state.patientData = ""
            state.patientData = action.payload
            return  state;
        },
    }
});

// each case under reducers becomes an action
export const {getPatientData}= PatientDataSilce.actions;

export default PatientDataSilce.reducer;
