async function GetAllWidgetByRoleId(id) {
  let url = window.AdminbaseUrl + "/api/WidgetRoleAssign/GetAllWidgetByRoleId?roleId=" + id+"&userId="+window.userId;
  let head = { "Content-Type": "application/JSON", accept: '*/*' };

  let data = {}
  let response = fetch(url, {
    headers: head,
    method: 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAllWidgetByRoleId;
