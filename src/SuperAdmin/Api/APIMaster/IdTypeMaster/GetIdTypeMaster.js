async function GetIdTypeMaster(data) {
    let url =
    window.AdminbaseUrl+"/api/IdTypeMaster/GetAllIdTypeMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetIdTypeMaster;