let GetEquipmentCategoryList = async() => {
  
    const url =  window.InventoryBaseUrl + "/api/EquipmentCategory/GetAllEquipmentCategory";
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(url,{
      method: "GET",
      header: head,
  
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  GetEquipmentCategoryList;
