let GetSurgeryPlannedList = async()=>{
    const url=window.OTBaseURL+"SurgeryPlanned/GetAllSurgeryPlanned";
    //const url="https://localhost:7100/api/SurgeryPlanned/GetAllSurgeryPlanned";
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetSurgeryPlannedList