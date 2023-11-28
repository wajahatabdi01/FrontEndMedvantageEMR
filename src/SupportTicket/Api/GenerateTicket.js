let GenerateTicket = async (params)=>{
    let url= window.AppbaseUrl+'/api/SupportTicket/GenerateTicket?ClientId='+params.ClientId+'&StatusId='+params.StatusId+'&UserId='+params.UserId+'&PriorityId='+params.PriorityId+'&Description='+params.Description+'&Subject='+params.Subject+'&FilePath='+params.FilePath
    let head={'Content-Type':'application/json','accept':'*/*',}
    let response ="";
    await fetch(url,{
        method:'POST',
        headers:head,
        body:''
    }).then((res)=> res.json()).then(data=>{response=data}).catch(error=>{response=error});
    return response;
}
export default GenerateTicket;