

export default async function GetUHIDbyPolicyNo(companyId,PolicyNo){    
    console.log('CompanyID,PolicyNo', companyId,PolicyNo);
    let URL = window.BillingbaseUrl+`/api/AllBills/GetPatientByPolicy?tpaCompanyID=${companyId}&tpaReferenceNo=${PolicyNo}`
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