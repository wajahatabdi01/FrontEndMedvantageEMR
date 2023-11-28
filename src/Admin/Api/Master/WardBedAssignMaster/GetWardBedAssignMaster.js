// async function GetWardBedAssignMaster(data) {
//     let url = window.AppbaseUrl+"/api/WardBedAssign/GetAllBedAssign";
//     let head = { "Content-Type": "application/JSON", accept : '*/*' };


//   let response = fetch(url, {
//     headers: head,
//     method : 'GET'
//   }).then((res) => res.json()).then(data);

//   return response;
// }
// export default GetWardBedAssignMaster;


async function GetWardBedAssignMaster(clientID) {
  let token = 'bearer ' + window.AppToken;
  let url = window.AppbaseUrl + "/api/WardBedAssign/GetAllBedAssign?ClientId=" + clientID;
  let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };

  let response = await fetch(url, {
    headers: head,
    method: 'GET'
  })
    .then((res) => res.json())
    .then();

  return response;
}
export default GetWardBedAssignMaster;
