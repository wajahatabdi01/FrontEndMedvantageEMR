async function GetRoleMaster(data) {
    let url = window.AdminbaseUrl+"/api/RoleMaster/GetAllRoleMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetRoleMaster;