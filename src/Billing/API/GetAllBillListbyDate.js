

export default async function GetAllBillListbyDate(fromdate,todate,pamentMode){    
    
    let URL = window.BillingbaseUrl +`/api/AllBills/GetAllBillsByDates?startDate=${fromdate}&endDate=${todate}&Id=${pamentMode}`;
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