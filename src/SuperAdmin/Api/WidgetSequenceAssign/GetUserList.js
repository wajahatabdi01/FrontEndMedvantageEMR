async function GetUserList() {
    let url = window.UserbaseUrl+"/api/Users/GetUserList?clientId="+window.clientId;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetUserList;