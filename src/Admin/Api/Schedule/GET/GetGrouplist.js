async function GetGrouplist(data) {
    let url = window.NotificationUrl+"/api/Group/GetAllGroupDetails";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetGrouplist;
