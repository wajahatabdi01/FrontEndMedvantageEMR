async function PutVehicleRenewal(data) {

    let url = window.InventoryBaseUrl + "/api/VehicleRenewal/UpdateVehicleRenewal";
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
  export default PutVehicleRenewal;
