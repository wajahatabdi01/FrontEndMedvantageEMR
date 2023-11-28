let GetUnitList = async (val)=>{
    let url = window.AppbaseUrl+"/api/KnowMedApis/getUnitBySuppliment?brandID="+val;
    let head ={"content-type": "application/json", accept:'*/*'};

    let response = fetch (url, {
        headers:head,
        method:'GET'
    })
    .then((res)=> res.json())
    .then();
    return response;
}
export default GetUnitList;