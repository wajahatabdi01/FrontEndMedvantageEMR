async function GetServiceHeadMapping(data) {
    let url =
    window.AdminbaseUrl+"/api/ServiceHeadMapping/GetAllServiceHeadMapping";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetServiceHeadMapping;