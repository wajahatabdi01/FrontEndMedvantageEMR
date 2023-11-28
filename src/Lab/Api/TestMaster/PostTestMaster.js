async function PostTestMaster(TestName, CategoryId,subCategoryId,  SampleId, ItemId, InstructionId,clientId,userId) {


    let url = window.LabServicebaseUrl + `/api/AllMasters/InsertTestName?TestName=${TestName}&CategoryId=${CategoryId}&SampleId=${SampleId}&ItemId=${ItemId}&InstructionId=${InstructionId}&UserId=${userId}&subCategoryId=${subCategoryId}&clientId=${clientId}`;
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
  export default PostTestMaster;