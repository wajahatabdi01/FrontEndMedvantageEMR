
async function GetAllPurchase(data) {
    let url = window.PharmacyServicesUrl+"/api/PurchaseMaster/GetAllPurchaseMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetAllPurchase;
  