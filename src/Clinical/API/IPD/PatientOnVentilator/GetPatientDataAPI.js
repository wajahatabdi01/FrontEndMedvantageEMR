let GetPatientDataAPI =async(UHID)=>{
    const url= window.AppbaseUrl+ "/api/PatientLifeSupportAssign/GetPatientData?UHID="+UHID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetPatientDataAPI;