import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store';
import "./Code/LanguageManage.js"

const root = ReactDOM.createRoot(document.getElementById('root'));


// // New local For FHIR

// window.AppbaseUrl = "http://192.168.11.101:6082"
// window.AppbaseUrlNew = "http://192.168.11.101:9000"
// window.AdminbaseUrl = "http://192.168.11.101:6083"
// window.UserbaseUrl = "http://192.168.11.101:6084"
// // window.FHIRBillingbaseUrl = "http://192.168.11.101:6088"
// window.BillingbaseUrl = "http://192.168.11.101:6088"
// window.LabServicebaseUrl = "http://192.168.11.101:6090"
// window.NotificationUrl = "http://192.168.11.101:6101"
// window.AppbaseUrl2 = "http://192.168.11.101:6082"
// window.RadiologyservicesUrl = "http://192.168.11.101:6086"
// window.PharmacyServicesUrl = "http://192.168.11.101:7000"
// // End For FHIR

// New local For FHIRTesting

// window.AppbaseUrl = "http://192.168.11.101:5082"
// window.AppbaseUrlNew = "http://192.168.11.101:9000"
// window.AdminbaseUrl = "http://192.168.11.101:5083"
// window.UserbaseUrl = "http://192.168.11.101:5084"
// // window.FHIRBillingbaseUrl = "http://192.168.11.101:5088"
// window.BillingbaseUrl = "http://192.168.11.101:5088"
// window.LabServicebaseUrl = "http://192.168.11.101:5090"
// window.NotificationUrl = "http://192.168.11.101:5101"
// window.AppbaseUrl2 = "http://192.168.11.101:6082"
// window.PharmacyServicesUrl = "http://192.168.11.101:4000"
// window.RadiologyservicesUrl = "http://192.168.11.101:5086"
// End For FHIRTesting

//New local For FHIR with SSl
 
window.AppbaseUrl = "https://onc.medvantage.tech:5082"
window.AppbaseUrlNew = "https://onc.medvantage.tech:9000"
window.AdminbaseUrl = "https://onc.medvantage.tech:5083"
window.UserbaseUrl = "https://onc.medvantage.tech:5084"
// window.FHIRBillingbaseUrl = "https://onc.medvantage.tech:5088"
window.BillingbaseUrl = "https://onc.medvantage.tech:5088"
window.LabServicebaseUrl = "https://onc.medvantage.tech:5090"
window.NotificationUrl = "https://onc.medvantage.tech:5101"
window.AppbaseUrl2 = "https://onc.medvantage.tech:5082"
window.RadiologyservicesUrl = "https://onc.medvantage.tech:5086"
window.PharmacyServicesUrl = "https://onc.medvantage.tech:4000"
//End For FHIR


// window.BillingbaseUrl = "http://192.168.11.101:6088"
// window.OTBaseURL = "http://172.16.61.31:7091/api/"
// window.BloodbaseUrl = "http://172.16.61.31:7092/"
// window.SendXMLDatabaseUl = "http://172.16.61.31:7082"
// window.PatientMonitorDashboard = "http://172.16.61.31:7085"
// //window.PatientMonitorDashboard = "http://medvantage.tech:7085"
// window.PatientMonitorDashboardAPI = "http://172.16.61.31:7087"
// //window.PatientMonitorDashboardAPI = "http://medvantage.tech:7087"
// window.SendXMLDatabaseUl = "http://172.16.61.31:7082"
// window.InventoryBaseUrl = "http://172.16.61.31:7093"
// window.BMSservicesUrl = "http://172.16.61.31:7094"
// window.MaintenanceUrl = "http://172.16.61.31:7099"
// // window.DietservicesUrl = "http://172.16.61.31:7096"
// window.DietservicesUrl = "http://192.168.11.101:6096"
// //window.RadiologyservicesUrl = "http://172.16.61.31:7086"
// window.ChatingUrl = "http://172.16.61.31:7100"
// window.FileUploadUrl = "http://172.16.61.31:7095/MediaFiles/"

// window.SpringBoardServicesUrl = "https://localhost:7170/"
// //window.SpringBoardServicesUrl = "http://172.16.61.31:7097/"
// window.CounsellingUrl = "http://172.16.61.31:7102/"
// window.LogBaseUrl = "http://172.16.61.31:7089/"
// // window.supportTicketUploadMediaBaseUrl = "http://23.236.54.179:127"
// window.supportTicketUploadMediaBaseUrl = "http://192.168.8.2:7088"

// ///////
// // window.fhiropenEMR = "http://192.168.11.101:6082"
// // window.fhirAdminEMR = "http://192.168.11.101:6083"
// // window.fhirUserEMR = "http://192.168.11.101:6084"
// window.fhiropenEMRLab = "http://192.168.11.101:6088"


// use for demo 

// window.AppbaseUrl = "https://demo.medvantage.tech:7082"
// window.AdminbaseUrl = "https://demo.medvantage.tech:7083"
// window.UserbaseUrl = "https://demo.medvantage.tech:7084"
// window.BillingbaseUrl = "https://demo.medvantage.tech:7088"
// window.OTBaseURL = "https://demo.medvantage.tech:7091/api/"
// window.BloodbaseUrl = "https://demo.medvantage.tech:7092"
// window.LabServicebaseUrl = "https://demo.medvantage.tech:7090"
// window.SendXMLDatabaseUl = "https://demo.medvantage.tech:7082"
// window.PatientMonitorDashboard = "https://demo.medvantage.tech:7085"
// window.PatientMonitorDashboardAPI = "https://demo.medvantage.tech:7087"
// window.SendXMLDatabaseUl = "https://demo.medvantage.tech:7082"
// window.InventoryBaseUrl = "https://demo.medvantage.tech:7093"
// window.SpringBoardServicesUrl = "https://demo.medvantage.tech:7097/"
// window.MaintenanceUrl = "https://demo.medvantage.tech:7099"
// window.BMSservicesUrl = "https://demo.medvantage.tech:7094"
// window.DietservicesUrl = "https://demo.medvantage.tech:7096"
// window.RadiologyservicesUrl = "https://demo.medvantage.tech:7086"
// window.PharmacyServicesUrl = "https://demo.medvantage.tech:8000"
// window.NotificationUrl = "https://demo.medvantage.tech:7101"
// window.ChatingUrl = "https://demo.medvantage.tech:7100"
// window.LogBaseUrl = "https://demo.medvantage.tech:7089/"
// window.LogBaseUrl = "https://demo.medvantage.tech:7089/"

//  for live server 

// window.AppbaseUrl = "https://api.medvantage.tech:7082"
// window.AdminbaseUrl = "https://api.medvantage.tech:7083"
// window.UserbaseUrl = "https://api.medvantage.tech:7084"
// window.BillingbaseUrl = "https://api.medvantage.tech:7088"
// window.OTBaseURL = "https://api.medvantage.tech:7091/api/"
// window.BloodbaseUrl = "https://api.medvantage.tech:7092"
// window.LabServicebaseUrl = "https://api.medvantage.tech:7090"
// window.SendXMLDatabaseUl = "https://api.medvantage.tech:7082"
// window.PatientMonitorDashboard = "https://api.medvantage.tech:7085"
// window.PatientMonitorDashboardAPI = "https://api.medvantage.tech:7087"
// window.SendXMLDatabaseUl = "https://api.medvantage.tech:7082"
// window.InventoryBaseUrl = "https://api.medvantage.tech:7093"
// window.SpringBoardServicesUrl = "https://api.medvantage.tech:7097/"
// window.MaintenanceUrl = "https://api.medvantage.tech:7099"
// window.BMSservicesUrl = "https://api.medvantage.tech:7094"
// window.DietservicesUrl = "https://api.medvantage.tech:7096"
// window.RadiologyservicesUrl = "https://api.medvantage.tech:7086"
// window.PharmacyServicesUrl = "https://api.medvantage.tech:8000"
// window.NotificationUrl = "https://api.medvantage.tech:7101"
// window.ChatingUrl = "https://api.medvantage.tech:7100"

window.AppToken = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).token : ""
window.SuperAdminToken = window.sessionStorage.getItem("SuperAdminData") ? JSON.parse(window.sessionStorage.getItem("SuperAdminData")).token : ""

window.userId = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).userId : ""
window.clientId = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).clientId : ""
window.superAdminUserId = window.sessionStorage.getItem("SuperAdminData") ? JSON.parse(window.sessionStorage.getItem("SuperAdminData")).userId : ""
window.languageId = window.sessionStorage.getItem("languageId") ? JSON.parse(window.sessionStorage.getItem("languageId")).languageId : ""

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
