async function DeleteDepartmentMaster(id) {

    let token ="bearer "+ window.SuperAdminToken;
    let url = window.AdminbaseUrl + `/api/DepartmentMaster/DeleteDepartmentMaster?id=` + id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",
        'Authorization': token,
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
export default DeleteDepartmentMaster