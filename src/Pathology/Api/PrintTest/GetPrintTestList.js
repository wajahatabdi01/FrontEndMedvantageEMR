let GetPrintTestList = async (isDuplicate,clientId) => {
  let url = window.LabServicebaseUrl+"/api/Print/GetListForPrintResult?isDuplicate="+isDuplicate+"&clientId="+clientId;
  //console.log('url : ',url)

    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetPrintTestList