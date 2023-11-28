
async function PutSubtestNormalRange(data) {

    let url = window.LabServicebaseUrl + '/api/AllMasters/UpdateSubtestNormalRange?subTestID='+data.subTestID+'&machineID='+data.machineID+'&gender='+data.gender+'&ageMin='+data.ageMin
    +'&ageMax='+data.ageMax+'&ageUnitID='+data.ageUnitID+'&rangeMin='+data.rangeMin+'&rangeMax='+data.rangeMax+'&rangeRemark='+data.rangeRemark+'&userID='+data.userID+'&Id='+data.id;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
      
  
    return response;
  }
  export default PutSubtestNormalRange;
