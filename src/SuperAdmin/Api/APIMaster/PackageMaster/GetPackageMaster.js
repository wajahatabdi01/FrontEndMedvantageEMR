async function GetPackageMaster(data) {
    let url =
    window.AdminbaseUrl+"/api/PackageMaster/GetAllPackageMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetPackageMaster;