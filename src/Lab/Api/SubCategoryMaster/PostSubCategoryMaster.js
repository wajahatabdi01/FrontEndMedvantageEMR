async function PostSubCategoryMaster(subCategoryName, categoryId,userId, clientId) {
  console.log("subCategoryName", subCategoryName)
    let url = window.LabServicebaseUrl + `/api/AllMasters/InsertSubCategoryMaster?subCategoryName=${subCategoryName}&categoryId=${categoryId}&UserId=${userId}&clientId=${clientId}`;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',    
      
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        // body: JSON.stringify(data)
      })
        .then((res) => res.json())
        // .then(data)
      
  
    return response;
  }
  export default PostSubCategoryMaster;