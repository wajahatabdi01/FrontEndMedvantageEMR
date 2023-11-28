async function GetEscalationList(data) {
    let url = window.NotificationUrl+"/api/Escalation/GetAllEscalation";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetEscalationList;
