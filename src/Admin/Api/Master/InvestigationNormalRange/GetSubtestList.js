async function GetSubtestList() {
    let url = window.AdminbaseUrl+"/api/SubTestMaster/GetAllSubTestMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetSubtestList;