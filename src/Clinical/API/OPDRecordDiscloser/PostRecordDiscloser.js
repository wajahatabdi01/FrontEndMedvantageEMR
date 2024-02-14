let PostRecordDiscloser =async(pobj)=>{
    let url= window.AppbaseUrl + "/api/FHIRRecordDisclosure/InsertRecordDisclosure";
   const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
   let data={};
   let response= await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify(pobj)
   }).then((res)=>res.json()).then(data);
   return response;
}
export default PostRecordDiscloser;
