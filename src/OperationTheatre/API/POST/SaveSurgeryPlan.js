let SaveSurgeryPlan =async(obj)=>{
     console.log('obj',obj)
     //const url=window.OTBaseURL+"SurgeryPlanned/GetAllSurgeryPlanned";
    //let url="https://localhost:7100/api/SurgeryPlanned/InsertSurgeryPlanned";
let url=window.OTBaseURL+"SurgeryPlanned/InsertSurgeryPlanned";
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"POST",
         headers:head,
         body:JSON.stringify(obj)
    }).then((res)=>res.json()).then(data);
    return response;
 }
 
 export default SaveSurgeryPlan;