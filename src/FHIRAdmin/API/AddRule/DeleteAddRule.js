async function DeleteAddRule(id) {

    let url = window.AppbaseUrl + `/api/EMRRuleMaster/DeleteRuleMaster?Id=` + id;
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
export default DeleteAddRule