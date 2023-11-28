async function GetProjectByUser(userID) {
  console.log("DD",userID);
  let url = window.SpringBoardServicesUrl+"api/ProjectMaster/GetProjectByUser?userID="+userID;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetProjectByUser;