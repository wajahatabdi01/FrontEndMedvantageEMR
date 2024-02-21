

export default async function GetAllCashlessFormList(){    
   
    let URL = window.BillingbaseUrl +`/api/FillCashLess/GetAllIssuanceDetail`;
 
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