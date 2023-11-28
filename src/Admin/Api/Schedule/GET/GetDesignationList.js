async function GetDesignationList(data) {
    let url = window.AdminbaseUrl+"/api/DesignationMaster/GetAllDesignationMaster";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetDesignationList;
