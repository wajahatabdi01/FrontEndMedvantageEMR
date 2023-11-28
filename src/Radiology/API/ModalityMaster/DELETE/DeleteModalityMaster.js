let DeleteModalityMaster = async(key)=>{
    let url = window.RadiologyservicesUrl + "/api/ModalityMaster/DeleteModalityMaster?id="+key;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let response = "";
    await fetch(url, {
        method: "DELETE",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { response = data })
        .catch(error => { response = error })


    return response
}
export default DeleteModalityMaster;