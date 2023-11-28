let GetStateList=async(countryID)=>{
    const url=window.AdminbaseUrl+"/api/StateMaster/GetStateMasterByCountryId?id="+countryID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetStateList;