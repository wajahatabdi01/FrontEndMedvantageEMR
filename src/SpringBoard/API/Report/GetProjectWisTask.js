async function GetProjectWiseTask(ProjectId,UserId) {
    let url = window.SpringBoardServicesUrl+"api/Report/GetProjectWiseTask?ProjectId="+ProjectId+"&UserId="+UserId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetProjectWiseTask;
