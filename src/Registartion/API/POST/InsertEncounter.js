let InsertEncounter =async(encounterDataObj)=>{
    let url= window.AppbaseUrl + "/FHIREncounter/InsertEncounter";
   const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
   let data={};
   let response= await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify(encounterDataObj)
   }).then((res)=>res.json()).then(data);
   return response;
}
export default InsertEncounter;
