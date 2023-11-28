let PostModalitymaster = async(params)=>{
    let url = window.RadiologyservicesUrl + '/api/ModalityMaster/InsertModalityMaster?modalityName='+params.modalityName+'&userId='+params.userID;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let response = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { response = data })
        .catch(error => { response = error })


    return response
}
export default PostModalitymaster;