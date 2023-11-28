async function GetLabUser(clientId) {
  let url = window.UserbaseUrl+"/api/Users/GetLabUserList?clientId="+clientId;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  header: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetLabUser;
