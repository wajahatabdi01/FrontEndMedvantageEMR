

export default async function getPatientDetailByUhid(UHID,BillNo){    
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let URL = window.BillingbaseUrl +`/api/Billing/getBillingPatientDetailsByUhId?uhId=${UHID}&billNo=${BillNo}&clientID=${clientID}`;
    //  let URL = window.BillingbaseUrl +`/api/Billing/getBillingPatientDetailsByUhId?uhId=${UHID}&billNo=${BillNo}`;
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