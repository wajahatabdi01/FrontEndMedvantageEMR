
async function GetConversionByProductId(productId) {
    let url = window.PharmacyServicesUrl+"/api/ConversionDetailsByProductId/GetConversionDetailsByProductId?ProductId="+productId;
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
  
  export default GetConversionByProductId;
  