
async function GetProduct(data) {
    let url = window.PharmacyServicesUrl+"/api/ProductMaster/GetAllProduct";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetProduct;
  