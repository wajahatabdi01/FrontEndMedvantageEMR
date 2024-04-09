async function GetAllFHIRMessageTypeMaster(data) {
    let url = window.AppbaseUrl+"/api/EMRMessageTypeMaster/GetAllFHIRMessageTypeMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetAllFHIRMessageTypeMaster;