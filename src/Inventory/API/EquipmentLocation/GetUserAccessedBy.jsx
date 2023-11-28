
async function GetUserAccessedBy (data) {
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let url = window.UserbaseUrl + `/api/Users/GetUserList?clientId=${clientID}`;
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
    