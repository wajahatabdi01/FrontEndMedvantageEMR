

export default async function GetAllPolicyList(UHID){    
    
    let URL = window.BillingbaseUrl +`/api/AllBills/GetAllPolicyByUHID?uhid=${UHID}`;
    //let URL = `https://localhost:7294/api/AllBills/GetAllPolicyByUHID?uhid=${UHID}`;
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