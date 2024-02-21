

export default async function GetAllApprovedandRejectList(UHID,Status){    
    
    let URL = window.BillingbaseUrl +`/api/IssuanceDetail/IssuanceReject_ApproveList?Uhid=${UHID}&isCashless=${Status}`;
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