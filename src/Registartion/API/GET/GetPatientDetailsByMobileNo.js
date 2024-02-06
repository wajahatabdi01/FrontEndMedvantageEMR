let GetPatientDetailsByMobileNo=async(mobileNo)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const url= window.AppbaseUrl+'/api/PatientRegistration/GetPatientDetailsByMobileNo?mobileNo='+mobileNo+'&clientID='+clientID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
       return response;
}
export default GetPatientDetailsByMobileNo;