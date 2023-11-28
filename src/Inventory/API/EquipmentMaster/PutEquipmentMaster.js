async function PutEquipmentMaster(data) {
    let url = window.InventoryBaseUrl + "/api/EquipmentMaster/UpdateEquipmentMaster";
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
  export default PutEquipmentMaster;
