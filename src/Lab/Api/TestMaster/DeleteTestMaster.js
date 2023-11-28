async function DeleteTestMaster(Id) {
    let url = window.LabServicebaseUrl + `/api/AllMasters/DeleteTestName?Id=` + Id;
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
export default DeleteTestMaster;
