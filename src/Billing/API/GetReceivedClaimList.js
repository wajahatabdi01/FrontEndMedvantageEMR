let GetReceivedClaimList = async(FromDate , ToDate) => {
   
    let URL = window.BillingbaseUrl + `/api/Claimremburse/GetAllClaimReciviedList?fromDate=${FromDate}&toDate=${ToDate}`;   
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(URL,{
      method: "GET",
      header: head,
  
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  GetReceivedClaimList;