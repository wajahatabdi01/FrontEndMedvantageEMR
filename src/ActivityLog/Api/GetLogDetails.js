let GetLogDetails =async(param)=>{
    const url= window.LogBaseUrl+ "api/ActivityLog/GetLogDataBetweenDates?fromDate="+param.fromDate+"&toDate="+param.toDate+"&fromId="+param.pNumber+"&pageSize="+param.pSize;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetLogDetails;