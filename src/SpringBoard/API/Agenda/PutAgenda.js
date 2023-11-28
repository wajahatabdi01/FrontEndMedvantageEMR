let PutAgenda =async(obj)=>{
    let url=window.SpringBoardServicesUrl+"api/Agenda/UpdateAgenda";
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"PUT",
         headers:head,
         body:JSON.stringify(obj)
    }).then((res)=>res.json()).then(data);
    return response;
  }
  
  export default PutAgenda;