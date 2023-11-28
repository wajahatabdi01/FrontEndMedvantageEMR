let GetPatientPersonalDashboardByUHID =async(UHID)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const url= window.AppbaseUrl+ "/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID="+UHID+"&ClientId="+clientID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetPatientPersonalDashboardByUHID;