let GetAdmitDetailsByUhid =async(uhid)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const url= window.AppbaseUrl+ "/api/AdmitPatientByPid/GetAdmitDetailByUhid?uhId="+uhid+'&ClientId='+clientID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetAdmitDetailsByUhid;