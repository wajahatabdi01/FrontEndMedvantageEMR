async function GetWardDepartmentAssign(data) {
    // let url = window.AppbaseUrl+"/api/WardDepartmentAssign/GetWardbyDepartment";
    let url = window.AppbaseUrl+"/api/WardDepartmentAssign/GetAllWardDepartmentAssign";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetWardDepartmentAssign;
