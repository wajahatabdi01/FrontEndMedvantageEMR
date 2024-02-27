async function GetIssueOutComeMaster (data) {
    let url = window.AppbaseUrl+"/api/IssueOutComeMaster/GetAllIssueOutCome";
      let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
      }
      let response =
        await fetch(url, {
          method: 'GET',
          headers: head,
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then(data)
    
      return response;
    }
    export default GetIssueOutComeMaster;

   
   
    