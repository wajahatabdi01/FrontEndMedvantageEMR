let TrackPolicyNo = async(companyId , PolicyNo) => {
   console.log('senddata' , companyId , PolicyNo)
    let URL = window.BillingbaseUrl + `/api/Claimremburse/TrackByPolicyNo?tpaCompanyID=${companyId}&tpaReferenceNo=${PolicyNo}`;   
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(URL,{
      method: "GET",
      header: head,
  
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  TrackPolicyNo;