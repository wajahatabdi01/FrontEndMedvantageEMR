
export default async function GetPolicyBills(UHID,policyNo){   
     let URL = window.BillingbaseUrl +`/api/AllBills/GetAllPolicyDetails?uhid=${UHID}&tpaReferenceNo=${policyNo}`;
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