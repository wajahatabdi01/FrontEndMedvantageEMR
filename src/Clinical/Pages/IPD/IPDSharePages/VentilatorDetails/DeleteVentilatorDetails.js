const DeleteVentilatorDetails = async(obj)=>{
    let url = window.AppbaseUrl + "/api/PatientVentilatorData/DeleteVentilatorData"
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "DELETE",
        headers: head,
        body: JSON.stringify(obj),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
    
}
export default DeleteVentilatorDetails;