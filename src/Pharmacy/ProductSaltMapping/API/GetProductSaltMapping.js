
async function GetProductSaltMapping(data) {
    let url = window.PharmacyServicesUrl+"/api/ProductSaltMapping/GetAllSalt";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetProductSaltMapping;
  