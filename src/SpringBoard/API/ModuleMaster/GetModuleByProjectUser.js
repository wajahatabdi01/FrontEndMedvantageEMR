async function GetModuleByProjectUser(projectId,UserID) {
    let url = window.SpringBoardServicesUrl+"api/ModuleMaster/GetModuleByProjectUser?ProjectID="+projectId+"&UserID="+UserID;

    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetModuleByProjectUser;