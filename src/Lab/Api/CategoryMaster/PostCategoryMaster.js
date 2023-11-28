async function PostCategoryMaster(categoryName, remark, clientId, userId) {

    let url = window.LabServicebaseUrl + `/api/AllMasters/InsertTestCategory?categoryName=${categoryName}&remark=${remark}&UserId=${userId}&clientId=${clientId}`;
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
  export default PostCategoryMaster;