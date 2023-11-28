const UpdateTicket = async (obj)=>{
    let url=window.AppbaseUrl+'/api/SupportTicket/GetTicketList?Id='+obj.rowID+'&ClientId='+obj.ClientId+'&StatusId='+obj.StatusId+'&UserId='+obj.UserId+'&PriorityId='+obj.PriorityId+'&Description='+obj.Description+'&Subject='+obj.Subject+'&FilePath='+obj.FilePath;
    let head = {'Content-Type':'application/json','accept':'*/*',}
    let resposne="";
    await fetch(url,{
        method:'PUT',
        headers:head,
        body:JSON.stringify()
    }).then((res)=>res.json()).then(data=>{resposne=data}).catch(error=>{resposne=error});
    return resposne;
 }
 export default UpdateTicket;