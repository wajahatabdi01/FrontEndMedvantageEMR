

async function GetAPIWardMaster(clientID) {
  let token = 'bearer ' + window.AppToken;
  let url = window.AppbaseUrl + "/api/WardMaster/GetAllWards?ClientId=" + clientID;
  let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };

  let response = await fetch(url, {
    headers: head,
    method: 'GET'
  })
    .then((res) => res.json())
    .then();

  return response;
}
export default GetAPIWardMaster;

