
async function GetCurrentDatePendingBacklog(UserId) {
    let url = window.SpringBoardServicesUrl+"api/AdminDashBoard/GetCurrentDatePendingBacklog?UserId="+UserId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetCurrentDatePendingBacklog

