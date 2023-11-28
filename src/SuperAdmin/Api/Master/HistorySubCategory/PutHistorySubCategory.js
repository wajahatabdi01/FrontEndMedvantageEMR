async function PutHistorySubCategory(data) {
  console.log(data)

    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + '/api/HistorySubCategory/UpdateHistorySubCategoryMaster';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      // 'Authorization': token
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
  export default PutHistorySubCategory;