async function GetFeatureMaster(data) {
    let url =
    window.AdminbaseUrl+"/api/FeatureMaster/GetAllFeatureMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetFeatureMaster;