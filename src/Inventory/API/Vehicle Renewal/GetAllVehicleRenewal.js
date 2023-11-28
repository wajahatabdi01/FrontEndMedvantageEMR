let GetAllVehicleRenewal = async() => {
  
    const url =  window.InventoryBaseUrl + "/api/VehicleRenewal/GetAllVehicleRenewal";
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(url,{
      method: "GET",
      header: head,
  
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  GetAllVehicleRenewal;
