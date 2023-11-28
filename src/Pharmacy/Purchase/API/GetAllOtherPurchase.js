
async function GetAllOtherPurchase(billNo) {
  
    let url = window.PharmacyServicesUrl+"/api/GetPurchaseByBillNo/GetPurchaseByBillNo?BillNo="+ billNo;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  let data ={}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
 
  }
  
  export default GetAllOtherPurchase;
  