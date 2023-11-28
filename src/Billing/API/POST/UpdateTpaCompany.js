let UpdateTpaCompany =async(obj)=>{
    let url=window.BillingbaseUrl+"/api/TpaCompany/UpdateCompany";
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"PUT",
         headers:head,
         body:JSON.stringify(obj)
    }).then((res)=>res.json()).then(data);
    return response;
 }
 
 export default UpdateTpaCompany;