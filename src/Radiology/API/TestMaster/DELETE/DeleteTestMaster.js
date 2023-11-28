let DeleteTestMaster = async(key)=>{
    let url = window.RadiologyservicesUrl + "/api/TestMaster/DeleteTestMaster?id="+key;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "DELETE",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default DeleteTestMaster;