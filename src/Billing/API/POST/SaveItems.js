let SaveItemMaster =async(obj)=>{
    let url=window.BillingbaseUrl+"/api/ItemRate/InsertItemRate";
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"POST",
         headers:head,
         body:JSON.stringify(obj)
    }).then((res)=>res.json()).then(data);
    return response;
 }
 export default SaveItemMaster;