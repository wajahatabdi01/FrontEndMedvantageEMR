async function GetOrganMasterList() {
    let url = window.RadiologyservicesUrl+"/api/OrganMaster/SelectTestOrganName";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }) .then((res) => res.json()).then(data);
  
  return response;
  }
  export default GetOrganMasterList;