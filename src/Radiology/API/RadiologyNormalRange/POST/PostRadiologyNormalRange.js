let PostRadiologyNormalRange = async(params)=>{
    let url = window.RadiologyservicesUrl + '/api/RadiologyNormalRange/InsertTestOrganName?organId='+params.organID+'&parameterId='+params.paramID+'&modularityId='+params.modularityID+'&gender='+params.gender+'&ageMin='+params.minAge+'&ageMax='+params.maxAge+'&ageUnitID='+params.ageUnit+'&rangeMin='+params.minRange+'&rangeMax='+params.maxRange+'&rangeUnitID='+params.rangeUnit+'&userID='+params.userID;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default PostRadiologyNormalRange;