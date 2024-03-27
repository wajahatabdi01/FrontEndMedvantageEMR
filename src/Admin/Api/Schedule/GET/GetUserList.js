
async function GetUserList(clientID) {
  let token = 'bearer ' + window.AppToken;
  let url = window.UserbaseUrl + "/api/Users/GetUserDetailsByUserId?clientId=" + clientID;
  // let url = window.UserbaseUrl + "/api/Users/GetUserDetailsByUserId?Id=" + 250 + '&clientId=' + 176;
  let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };

  let response = await fetch(url, {
    headers: head,
    method: 'GET'
  })
    .then((res) => res.json())
    .then();

  return response;
}
export default GetUserList;

