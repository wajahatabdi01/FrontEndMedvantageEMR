
async function GetManufacturer(data) {
    let url = window.PharmacyServicesUrl+"/api/Manufacture/GetAllManufacturer";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetManufacturer;
  