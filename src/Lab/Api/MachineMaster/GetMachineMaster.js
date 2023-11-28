async function GetMachineMaster(data) {
    let url = window.LabServicebaseUrl+"/api/AllMasters/SelectMachineMaster";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetMachineMaster;
