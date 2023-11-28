let GetDischargeCard = async (UhId,DischargeTypeId)=>{
    const url=window.AppbaseUrl+"/api/Discharge/GetPatientHistory?UhId="+UhId+"&DischargeTypeId="+DischargeTypeId+"&UserID="+window.userId+"";
    const head={'content-type':'application/json','accept':'*/*'}
    let data={}
    let response = await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=>res.json()).then(data)
    return response;

}
export default GetDischargeCard;

