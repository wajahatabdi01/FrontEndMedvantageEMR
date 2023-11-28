let GetStateList=async(countryID)=>{
    let langId = JSON.parse(window.sessionStorage.getItem("languageId")).languageId;
    const url= window.AdminbaseUrl+"/api/StateMaster/GetStateMasterByCountryId?id="+countryID+"&languageId="+langId;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetStateList;