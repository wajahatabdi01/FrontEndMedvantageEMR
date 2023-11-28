
async function GetAllApplicationFeatureChecklistMaster(data) {
    let url = window.AdminbaseUrl+"/api/ApplicationFeatureChecklist/GetAllApplicationFeatureChecklist";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetAllApplicationFeatureChecklistMaster;
  