async function DeleteItemCategoryMaster(data) {

    let url = window.InventoryBaseUrl + "/api/ItemCategoryMaster/DeleteItemCategoryMaster";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'DELETE',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default DeleteItemCategoryMaster;