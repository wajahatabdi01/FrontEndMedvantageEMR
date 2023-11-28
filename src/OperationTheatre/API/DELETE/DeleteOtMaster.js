let DeleteOtMaster = async (id,userID)=>{
    let url=window.OTBaseURL+"OtMaster/DeleteOtMaster?Id="+id+"&userId="+userID;
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"DELETE",
         headers:head,
         body:JSON.stringify()
    }).then((res)=>res.json()).then(data);
    return response;
}
export default DeleteOtMaster;