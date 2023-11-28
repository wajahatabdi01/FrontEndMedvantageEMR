let GetVitalList = async()=>{
    const url = window.AdminbaseUrl+"/api/VitalMaster/GetAllVitalMaster";
    const head ={'content-type':'application/json','accept':'*/*',};
    let data={};
    let response=await fetch(url,{
        method:'GET',
        headers:head,
    }).then(res=>res.json()).then(data);
    return response;
}
export default GetVitalList;