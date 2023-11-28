async function PostTestSubTestMapping(testId, subTestId, userId,clientId) {


    let url = window.LabServicebaseUrl + `/api/AllMasters/Inserttestsubtestmapping?testId=${testId}&subTestId=${subTestId}&UserId=${userId}&clientId=${clientId}`;
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
  export default PostTestSubTestMapping;