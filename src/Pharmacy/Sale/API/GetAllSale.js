
async function GetAllSale(data) {
    let url = window.PharmacyServicesUrl+"/api/SaleMaster/GetAllSaleMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetAllSale;
  