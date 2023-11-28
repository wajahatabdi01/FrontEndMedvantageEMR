

export default async function GetAllAdvanceDetails(UHID){    
   
   let URL = window.BillingbaseUrl +`/api/AddAdvance/GetAllAdvanceLimt?uhid=${UHID}`;

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