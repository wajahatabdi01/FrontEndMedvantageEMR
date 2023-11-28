
async function GetAllSaleByBillNo(billNo) {
    let url = window.PharmacyServicesUrl+`/api/SaleMaster/GetAllSaleMasterBybill?billNo=${billNo}`;
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
  
  export default GetAllSaleByBillNo;
  