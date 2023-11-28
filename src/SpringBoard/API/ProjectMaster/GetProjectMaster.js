async function GetProjectMaster(data) {
    let url = window.SpringBoardServicesUrl+"api/ProjectMaster/SelectProject";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetProjectMaster;
