let InsertPatientDemographicData =async(sendDataObj)=>{
    let url= window.AppbaseUrl + "/api/FHIRDemographicData/InsertPatientDemographicData";
   const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
   let data={};
   let response= await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify(sendDataObj)
   }).then((res)=>res.json()).then(data);
   return response;
}
export default InsertPatientDemographicData;
