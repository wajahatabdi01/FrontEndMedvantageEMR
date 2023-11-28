let GetOTMaintenanceList = async()=>{
    const url=window.OTBaseURL+"OTMaintenance/GetAllOTMaintenance";
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetOTMaintenanceList