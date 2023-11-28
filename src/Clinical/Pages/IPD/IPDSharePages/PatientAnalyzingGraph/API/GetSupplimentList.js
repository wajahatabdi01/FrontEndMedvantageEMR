let GetSupplimentList = async()=>{
    const url=window.AppbaseUrl+"/api/KnowMedApis/getSupplimentList";
    const head={'content-type':'application/json','accept':'*/*',}
    let data={}
    let response = await fetch(url,{
        method:'GET',
        headers:head
    }).then(res=>res.json()).then(data)
    return response
}
export default GetSupplimentList;