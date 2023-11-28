async function GetPackageServiceMapping(data) {
    let url =
    window.AdminbaseUrl+"/api/PackageServiceMapping/GetAllPackageServiceMapping";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetPackageServiceMapping;