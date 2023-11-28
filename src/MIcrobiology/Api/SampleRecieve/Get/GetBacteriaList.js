async function GetBacteriaList(BillNo) {
  let url = window.AppbaseUrl+"/api/KnowMedApis/getBacteriaList";

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetBacteriaList;
