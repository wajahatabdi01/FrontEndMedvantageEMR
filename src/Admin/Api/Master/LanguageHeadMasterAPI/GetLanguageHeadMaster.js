async function GetLanguageHeadMaster(data) {
    let url = window.AdminbaseUrl + "/api/LangHeadMaster/GetAllHeadLang"
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
  
    
    let response = fetch(url, {
      headers: head,
      method: 'GET'
    })
      .then((res) => res.json())
      .then(data);
  
    return response;
  }
  export default GetLanguageHeadMaster;