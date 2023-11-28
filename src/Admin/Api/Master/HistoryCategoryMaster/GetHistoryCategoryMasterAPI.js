let GetHistoryCategoryMasterAPI = async()=>{
    let url = window.AdminbaseUrl+"/api/HistoryCategory/GetAllHistoryCategoryMaster";;
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetHistoryCategoryMasterAPI