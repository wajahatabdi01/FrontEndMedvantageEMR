async function GetDashboardWidgetAssign() {
    let url = window.AdminbaseUrl+"/api/DashboardWidgetAssign/GetAllDashboardWidgetAssign";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetDashboardWidgetAssign;