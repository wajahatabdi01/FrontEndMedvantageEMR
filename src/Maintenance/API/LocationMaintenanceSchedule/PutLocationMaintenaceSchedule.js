
async function PutLocationMaintenaceSchedule (data) {

    let url = window.MaintenanceUrl + "/api/LocationMaintenanceSchedule/UpdateLocationMaintenanceSchedule";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PutLocationMaintenaceSchedule;

  
  