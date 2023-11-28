const PostVentilatorDetails = async(obj)=>{
    let url = window.AppbaseUrl + "/api/PatientVentilatorData/InsertPatientVentilatorData"
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(obj),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
    
}
export default PostVentilatorDetails;