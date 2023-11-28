async function GetRoleWiseMenuAssign(data) {
    let url = window.AdminbaseUrl+"/api/RoleWiseMenuAssign/GetRoleWiseMenuAssignById";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetRoleWiseMenuAssign;