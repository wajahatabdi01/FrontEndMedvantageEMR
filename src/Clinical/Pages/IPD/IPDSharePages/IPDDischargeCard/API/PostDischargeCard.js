let PostDischargeCard = async (obj)=>{
    console.log("obj.followUpDate", obj.followUpDate)
    const url=window.AppbaseUrl+"/api/Discharge/DischargePatient";
    const head={'content-type':'application/json','accept':'*/*'}
    let data={}
    let response = await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify(obj)
    }).then(res=>res.json()).then(data)
    return response;

}
export default PostDischargeCard;