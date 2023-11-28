

  async function PostInsuranceDetails(data) {

    let URL = window.BillingbaseUrl + "/api/IssuanceDetail/InsertIssuanceDetail";   
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(URL, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PostInsuranceDetails;

  