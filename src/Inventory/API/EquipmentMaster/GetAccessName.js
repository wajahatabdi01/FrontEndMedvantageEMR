let GetAccessName = async() => {
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
      let url = window.UserbaseUrl + `/api/Users/GetUserList?clientID=${clientID}`;
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(url,{
      method: "GET",
      header: head,
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  GetAccessName;
