async function GetRTHoldTypeMaster() {
    let url = window.AppbaseUrl+"/api/RTHoldTypeMaster/GetAllRTHoldTypeMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetRTHoldTypeMaster;