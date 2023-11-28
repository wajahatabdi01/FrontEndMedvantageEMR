async function GetSprintBacklogComplete(userID) {
    let url = window.SpringBoardServicesUrl+"api/SprintBacklogMaster/GetSprintBacklogComplete?userID="+userID;
  
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);
  
  return response;
  }
  export default GetSprintBacklogComplete;