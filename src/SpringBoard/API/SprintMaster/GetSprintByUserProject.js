async function GetSprintByUserProject(ProjectId,UserId) {
    let url = window.SpringBoardServicesUrl+"api/SprintMaster/GetSprintByUserIdProjectId?ProjectId="+ProjectId+"&UserId="+UserId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetSprintByUserProject;