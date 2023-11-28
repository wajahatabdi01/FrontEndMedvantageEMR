async function PostSubTestMaster(subTestName, remark,chemicalCompoundID,testtemplate, userId, clientId) {

    let url = window.LabServicebaseUrl + `/api/AllMasters/InsertSubtestMaster?subTestName=${subTestName}&remark=${remark}&chemicalCompoundID=${chemicalCompoundID}&testtemplate=${testtemplate}&UserId=${userId}&clientId=${clientId}`;
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
  export default PostSubTestMaster;