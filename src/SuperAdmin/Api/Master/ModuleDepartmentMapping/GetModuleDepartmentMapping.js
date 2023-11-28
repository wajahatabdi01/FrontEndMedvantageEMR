async function GetModuleDepartmentMapping(data) {
    let url = window.AdminbaseUrl+"/api/ModuleDepartmentMapping/GetAllModuleDepartmentMapping";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetModuleDepartmentMapping;