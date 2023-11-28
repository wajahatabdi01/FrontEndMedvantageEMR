async function GetUserTestSubCategoryAssign(clientId) {
    let url = window.LabServicebaseUrl+"/api/AllMasters/SelectUserTestsubCategoryAssign?clientId="+clientId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

let data = {};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetUserTestSubCategoryAssign;
