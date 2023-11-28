async function GetGroupkeywordList(data) {
    let url = window.NotificationUrl+"/api/GroupKeywordAssign/GetAllGroupKeywordAssign";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetGroupkeywordList;
