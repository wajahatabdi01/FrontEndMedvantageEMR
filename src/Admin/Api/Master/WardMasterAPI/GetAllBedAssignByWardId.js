
async function GetAllBedAssignByWardId(id) {
    let url = window.AppbaseUrl+`/api/WardBedAssign/GetAllBedAssign?WardId=${id}&UserId=${window.userId}&ClientId=${window.clientId}`;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  let data ={}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);
  
  return response;
  }
  export default GetAllBedAssignByWardId;
  
  