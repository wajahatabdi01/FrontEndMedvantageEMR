async function DeleteMachineMaster(Id) {
    let url = window.LabServicebaseUrl + `/api/AllMasters/DeleteMachineMaster?Id=` + Id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",

    };
    let data = {};
    let response =
        await fetch(url, {
            headers: head,
            method: "DELETE",
        }).then((res) => res.json())
            .then(data)
    return response;
}
export default DeleteMachineMaster;
