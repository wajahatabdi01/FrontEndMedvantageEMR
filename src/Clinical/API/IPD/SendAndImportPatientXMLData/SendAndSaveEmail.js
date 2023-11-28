async function SendAndSaveEmail(data) {

    let url = window.SendXMLDatabaseUl + "/api/SendAndImportPatientXMLData/GetAndInsertPatientXMLData";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      }).then((res) => res.json()).then(data)
  
  
    return response;
  }
  export default SendAndSaveEmail;