async function GetDashboardMaster() {
    let url = window.AdminbaseUrl+"/api/DashboardMaster/GetAllDashboardMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetDashboardMaster;