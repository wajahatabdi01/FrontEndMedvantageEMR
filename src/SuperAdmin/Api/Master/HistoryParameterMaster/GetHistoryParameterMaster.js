async function GetHistoryParameterMaster(data) {
    let url = window.AppbaseUrl+"/api/HistoryParameter/GetAllHistoryParameterMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetHistoryParameterMaster;