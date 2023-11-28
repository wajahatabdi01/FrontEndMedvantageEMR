let GetPatientDetailsByUHID = async(UHID, clientId)=>{
    const url= window.AppbaseUrl+"/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID="+UHID+"&ClientId="+clientId;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetPatientDetailsByUHID