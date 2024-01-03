let OPDPatientRegistration =async(dataObj)=>{
    let url= window.AppbaseUrl + "/api/PatientRegistration/InsertPatient";
   const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
   let data={};
   let response= await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify(dataObj)
   }).then((res)=>res.json()).then(data);
   return response;
}


let InsertFHIRPatientHistory =async(dataObj)=>{
     let url= "http://192.168.11.101:6082/api/FHIRPatientHistory/InsertFHIRPatientHistory";
    const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"POST",
         headers:head,
         body:JSON.stringify(dataObj)
    }).then((res)=>res.json()).then(data);
    return response;
 }
 export { OPDPatientRegistration, InsertFHIRPatientHistory };
