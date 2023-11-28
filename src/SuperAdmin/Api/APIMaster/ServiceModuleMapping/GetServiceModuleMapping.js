async function GetServiceModuleMapping(data) {
    let url =
    window.AdminbaseUrl+"/api/ServiceModuleMapping/GetAllServiceModuleMapping";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetServiceModuleMapping;