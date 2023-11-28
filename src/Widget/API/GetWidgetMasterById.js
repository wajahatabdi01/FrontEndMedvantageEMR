async function GetWidgetMasterById(id, date) {
    let url = window.AdminbaseUrl+"/api/WidgetMaster/GetWidgetMasterById?id="+id;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data = {}

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetWidgetMasterById;
