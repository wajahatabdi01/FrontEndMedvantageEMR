
async function PostVehicleRenewal(data) {

    let url = window.InventoryBaseUrl + "/api/VehicleRenewal/InsertVehicleRenewal";
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
  export default PostVehicleRenewal;
