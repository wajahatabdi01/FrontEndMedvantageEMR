let PutSubCategoryMaster = async(params)=>{
    let url = window.RadiologyservicesUrl + "/api/TestSubCategoryMaster/UpdateSubCategory?categoryId="+params.categoryId+"&subCategoryName="+params.subCategoryName+"&userId="+params.userID+"&id="+params.key;
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
export default PutSubCategoryMaster;