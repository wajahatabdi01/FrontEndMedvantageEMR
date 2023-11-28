async function UpdateEquipmentCategory(data) {

    let url = window.InventoryBaseUrl + "/api/EquipmentCategory/UpdateEquipmentCategory";
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
  export default UpdateEquipmentCategory;
