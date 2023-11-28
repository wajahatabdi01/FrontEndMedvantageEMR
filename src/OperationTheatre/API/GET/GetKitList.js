let GetKitList = async()=>{
    const url=window.OTBaseURL+"SurgeryKitMaster/GetAllKitMaster";
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetKitList