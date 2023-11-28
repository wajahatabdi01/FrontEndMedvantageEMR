
let GetItemCategoryMaster = async() => {
    const url =  window.InventoryBaseUrl + "/api/ItemCategoryMaster/GetAllItemCategoryMaster";
    const headers = {
      'content-type': 'application/json',
      'accept': '*/*',
    };
    let data = {};
    let response = await fetch(url,{
      method: "GET",
      header: headers,
  
    }).then(res => res.json()).then(data);
console.log(data)
    return response;
  }
  export default GetItemCategoryMaster;


