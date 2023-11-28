async function GetAllNotificationCount(id) {
    let data= {}
    let url = window.MaintenanceUrl+"/api/Complaint/GetAllComplaintNotification?RespondentDepartmentID="+window.userId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAllNotificationCount;
