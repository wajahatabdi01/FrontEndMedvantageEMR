let UpdateSurgeryKitAssign =async(obj)=>{
    let url=window.OTBaseURL+"SurgeryKitAssign/UpdateSurgeryKitAssign";
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"PUT",
         headers:head,
         body:JSON.stringify(obj)
    }).then((res)=>res.json()).then(data);
    return response;
 }
 
 export default UpdateSurgeryKitAssign;