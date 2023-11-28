async function GetSubTestMaster(data) {
    let url = window.AdminbaseUrl+"/api/SubTestMaster/GetAllSubTestMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetSubTestMaster;