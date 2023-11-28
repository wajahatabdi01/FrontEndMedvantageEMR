

export default async function GerItemRateByCompany(companyName){    
    console.log('uhid val', companyName);
    let URL = window.BillingbaseUrl +`/api/ItemRate/GetAllItemRateByCompany?companyID=${companyName}`;
   let head = {"Content-Type":"application/json", 'accept':'*/*'};
   
   let response = "";
   response = await fetch(URL, {
       headers:head,
       method:"GET"        
   })
   .then(res => res.json())  
   .catch(error => response=error);    
   return response;
}