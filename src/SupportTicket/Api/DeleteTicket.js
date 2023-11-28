
const DeleteTicket = async (obj)=>{
    let url=window.AppbaseUrl+'/api/SupportTicket/GetTicketList?Id='+obj.rowID+'&ClientId='+obj.ClientId+'&UserId='+obj.UserId;
    let head = {'Content-Type':'application/json','accept':'*/*',}
    let resposne="";
    await fetch(url,{
        method:'DELETE',
        headers:head,
        body:JSON.stringify()
    }).then((res)=>res.json()).then(data=>{resposne=data}).catch(error=>{resposne=error});
    return resposne;
 }
 export default DeleteTicket;