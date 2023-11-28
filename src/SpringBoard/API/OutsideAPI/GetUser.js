async function GetUser() {
    let url = window.UserbaseUrl+"/api/Users/GetUserList?clientId="+window.clientId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetUser

