

export default async function GetAdvancePaymentList(UHID,FromDate,ToDate){    
   
    let URL = window.BillingbaseUrl +`/api/AddAdvance/GetAllAdvanceList?uhid=${UHID}&fromDate=${FromDate}&toDate=${ToDate}`;
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