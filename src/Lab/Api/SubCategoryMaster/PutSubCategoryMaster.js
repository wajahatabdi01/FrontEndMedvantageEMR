async function PutSubCategoryMaster(subCategoryName, categoryId, Id, userId) {
 
    let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateSubCategoryMaster?subCategoryName=${subCategoryName}&categoryId=${categoryId}&UserId=${userId}&Id=${Id}`;    
    let head = {
      "Content-Type": "application/JSON",
      accept: "*/*",
    };
  
    let response = await fetch(url, {
      method: "PUT",
      headers: head,
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      // .then(data);
  
    return response;
  }
  export default PutSubCategoryMaster;
  