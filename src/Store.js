import { configureStore } from "@reduxjs/toolkit";
import UHIDSearch from "./Reduce/OPD/UHIDSearch";
import PatientData from "./Reduce/OPD/PatientData";
import PatientSendData from "./Reduce/OPD/PatinetSendData";
import IPDPatientData from "./Reduce/IPD/IPDPatientData";
import IPDUHIDChange from "./Reduce/IPD/IPDUHIDChange";
import Notifications from "./Reduce/Notification/Notifications";

const store = configureStore({
    reducer: {
        "UHIDSearch":UHIDSearch,
        "PatientData":PatientData,
        "PatientSendData":PatientSendData,
        "IPDPatientSendData":IPDPatientData,
        "IPDUHIDChange":IPDUHIDChange,
        "Notifications":Notifications,
    }
})

export default store;