 

async function GetAllTemplateMaster(ClientId) {
    let token = 'bearer ' + window.AppToken;
    let url = window.AppbaseUrl + "/api/NotesTemplateMaster/GetAllTemplate?clientId=" + ClientId + "&userId=" + window.userId;
    let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };
  
    let response = await fetch(url, {
      headers: head,
      method: 'GET'
    })
      .then((res) => res.json())
      .then();
  
    return response;
  }
  export default GetAllTemplateMaster;
  
  