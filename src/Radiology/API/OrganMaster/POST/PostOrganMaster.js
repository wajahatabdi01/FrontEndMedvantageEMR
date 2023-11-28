let PostOrganMaster = async(params)=>{
    let url = window.RadiologyservicesUrl + '/api/OrganMaster/InsertTestOrganName?organId='+params.organID+'&organName='+params.organName+'&remark='+params.remark+'&userId='+params.userID;
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
export default PostOrganMaster;