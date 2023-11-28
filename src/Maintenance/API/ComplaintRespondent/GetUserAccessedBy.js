
async function GetUserAccessedBy (data) {

  let url = window.UserbaseUrl + "/api/Users/GetUserList?clientId="+window.clientId;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'GET',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default GetUserAccessedBy;
  