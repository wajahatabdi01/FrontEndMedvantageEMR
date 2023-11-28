async function GetWidgetRoleAssign() {
    let url = window.AdminbaseUrl+"/api/WidgetRoleAssign/GetAllWidgetRoleAssign";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetWidgetRoleAssign;