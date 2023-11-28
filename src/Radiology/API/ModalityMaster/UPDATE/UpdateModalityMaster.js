let UpdateModalityMaster = async(params)=>{
    let url = window.RadiologyservicesUrl + "/api/ModalityMaster/UpdateModalityMaster?modalityName="+params.modalityName+"&userId="+params.userID+"&id="+params.key;
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
export default UpdateModalityMaster;