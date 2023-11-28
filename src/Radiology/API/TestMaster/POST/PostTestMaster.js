
let PostTestMaster = async(params)=>{
    let url = window.RadiologyservicesUrl + '/api/TestMaster/InsertTestMaster?testName='+params.testName+'&modularityId='+params.modularityId+'&organId='+params.organId+'&categoryId='+params.categoryId+'&subCategoryId='+params.subCategoryId+'&itemId='+params.itemId+'&sampleId='+params.sampleId+'&instructionId='+params.instructionId+'&userId='+params.userID;
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
export default PostTestMaster;