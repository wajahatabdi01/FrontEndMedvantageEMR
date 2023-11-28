async function PutUserTestCategoryAssign(testCategoryID, labUserID, Id) {
 
    let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateUserTestCategoryAssign?testCategoryID=${testCategoryID}&labUserID=${labUserID}&UserId=${window.userId}&Id=${Id}`;
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
  export default PutUserTestCategoryAssign;
  