
async function GetMaintenanceVisit (data) {

    let url = window.MaintenanceUrl + "/api/MaintenanceVisit/GetAllMaintenanceVisit";
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
  export default GetMaintenanceVisit;

  
  