const GetTicketList = async (obj)=>{
    let url=window.AppbaseUrl+'/api/SupportTicket/GetTicketList?ClientId='+obj.ClientId+'&StatusId='+obj.StatusId+'&UserId='+obj.UserId;
    let head = {'Content-Type':'application/json','accept':'*/*',}
    let resposne="";
    await fetch(url,{
        method:'Get',
        headers:head,
        body:JSON.stringify()
    }).then((res)=>res.json()).then(data=>{resposne=data}).catch(error=>{resposne=error});
    return resposne;
 }
 export default GetTicketList;