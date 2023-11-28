let UpdateRadiologyNormalRange = async(params)=>{
    let url = window.RadiologyservicesUrl + "/api/RadiologyNormalRange/UpdateTestOrganName?organId="+params.organID+"&parameterId="+params.paramID+"&modularityId="+params.modularityID+"&gender="+params.gender+"&ageMin="+params.minAge+"&ageMax="+params.maxAge+"&ageUnitID="+params.ageUnit+"&rangeMin="+params.minRange+"&rangeMax="+params.maxRange+"&rangeUnitID="+params.rangeUnit+"&userID="+params.userID+"&id="+params.key;
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
export default UpdateRadiologyNormalRange;