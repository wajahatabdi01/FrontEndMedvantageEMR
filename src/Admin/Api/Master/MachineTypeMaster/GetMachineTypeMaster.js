async function GetMachineTypeMaster(data) {
    let url = window.AppbaseUrl+"/api/MachineTypeMaster/GetAllMachineTypeMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetMachineTypeMaster;