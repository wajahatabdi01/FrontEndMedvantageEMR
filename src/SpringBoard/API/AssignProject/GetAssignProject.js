async function GetAssignProject() {
    let url = window.SpringBoardServicesUrl+"api/AssignProject/GetAllProjectAssign";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAssignProject

