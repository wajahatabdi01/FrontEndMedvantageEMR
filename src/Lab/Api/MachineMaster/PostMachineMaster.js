async function PostMachineMaster(machineName, remark) {

    let url = window.LabServicebaseUrl + `/api/AllMasters/InsertMachineMaster?machineName=${machineName}&remark=${remark}&UserId=${window.userId}`;
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
  export default PostMachineMaster;