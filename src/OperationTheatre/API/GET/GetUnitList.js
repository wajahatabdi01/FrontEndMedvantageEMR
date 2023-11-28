let GetUnitList = async()=>{
    const url=window.AdminbaseUrl+"/api/UnitMaster/GetAllUnitMaster";
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetUnitList