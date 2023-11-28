
async function PostSubtestNormalRange(data) {

    let url = window.LabServicebaseUrl + '/api/AllMasters/InsertSubtestNormalRange?subTestID='+data.subTestID+'&machineID='+data.machineID+'&gender='+data.gender+'&ageMin='+data.ageMin
    +'&ageMax='+data.ageMax+'&ageUnitID='+data.ageUnitID+'&rangeMin='+data.rangeMin+'&rangeMax='+data.rangeMax+'&rangeRemark='+data.rangeRemark+'&userID='+data.userID+'&clientId='+data.clientId;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
      
  
    return response;
  }
  export default PostSubtestNormalRange;
