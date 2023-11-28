let GetUserList = async()=>{
    const url=window.UserbaseUrl+"/api/Users/GetUserList?clientId="+window.clientId;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetUserList