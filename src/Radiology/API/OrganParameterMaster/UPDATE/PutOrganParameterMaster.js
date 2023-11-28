 let PutOrganParameterMaster = async(params)=>{
      let url = window.RadiologyservicesUrl + "/api/OrganParameterMaster/UpdateTestName?testOrganID="+params.organID+"&parameterName="+params.parameterName+"&userId="+params.userID+"&id="+params.key;
      let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
      let responsonse = "";
      await fetch(url, {
          method: "PUT",
          headers: head,
          body: JSON.stringify(),
      }).then(res => res.json())
          .then(data => { responsonse = data })
          .catch(error => { responsonse = error })
  
  
      return responsonse
  }
  export default PutOrganParameterMaster;