const GetPriorityList = async ()=>{
    let url=window.AppbaseUrl+"/api/SupportTicket/GetPriorityList";
    let head={"Content-Type":"application/json","accept":"*/*",};
    let response="";
    await fetch(url,{
        method:'GET',
        headers:head,
        body:JSON.stringify()
    }).then((res)=>res.json()).then(data=>{response = data}).catch(error=>{response = error});
    return response;
}
export default GetPriorityList;