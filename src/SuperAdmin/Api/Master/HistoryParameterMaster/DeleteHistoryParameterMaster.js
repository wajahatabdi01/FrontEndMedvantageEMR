async function DeleteHistoryParameterMaster(id) {

    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + `/api/HistoryParameter/DeleteHistoryParameterMaster?id=` + id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",
        // 'Authorization': token,
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
export default DeleteHistoryParameterMaster