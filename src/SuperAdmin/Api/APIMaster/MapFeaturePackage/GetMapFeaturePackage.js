async function GetMapFeaturePackage(data) {
    let url =
    window.AdminbaseUrl+"/api/MapFeaturePackage/GetAllMapFeaturePackage";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetMapFeaturePackage;