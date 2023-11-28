async function GetAllBodyOrgan(data) {
    // let url = window.AppbaseUrl+"/api/WardDepartmentAssign/GetWardbyDepartment";
    let url = window.AppbaseUrl+"/api/KnowMedApis/GetAllBodyOrgans";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAllBodyOrgan;
