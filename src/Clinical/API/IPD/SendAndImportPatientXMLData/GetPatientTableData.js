
async function GetPatientTableData(data) {

    let url = window.SendXMLDatabaseUl + "/api/SendAndImportPatientXMLData/GetExportPatientXMLData";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default GetPatientTableData;