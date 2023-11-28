
async function GetUnitMaster(data) {
    let url = window.PharmacyServicesUrl+"/api/PharmacyUnitMaster/GetAllUnitMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetUnitMaster;
  