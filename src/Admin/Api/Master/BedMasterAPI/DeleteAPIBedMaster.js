async function DeleteAPIBedMaster(senddata) {
    let url = window.AppbaseUrl + "/api/BedMaster/DeleteBedMaster";
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",

    };
    let data = {};
    let response =
        await fetch(url, {
            headers: head,
            method: "DELETE",
            body:JSON.stringify(senddata)
        }).then((res) => res.json()).then(data)
    return response;
}
export default DeleteAPIBedMaster;
