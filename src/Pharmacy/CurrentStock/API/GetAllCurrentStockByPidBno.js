
async function GetAllCurrentStockByPidBno(productId, batchNo) {
    let url = window.PharmacyServicesUrl+"/api/CurrentStock/GetAllCurrentStockByPidBno?productId="+productId + "&batchNo=" + batchNo;
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
  export default GetAllCurrentStockByPidBno;
  