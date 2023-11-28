async function GetTestListForIpdandOpd(uhid, categoryId) {
    let url = window.LabServicebaseUrl+`/api/SubTestListForDashboard/GetTestListForIpdandOpd?UHID=${uhid}&categoryId=${categoryId}`;

    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetTestListForIpdandOpd;
