
async function GetHSNCode(data) {
    let url = window.PharmacyServicesUrl+"/api/HSNCodeMaster/GetAllHSNCodeMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetHSNCode;
  