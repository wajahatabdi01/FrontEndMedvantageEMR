async function DeleteExaminationParameterMaster(id) {

    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + `/api/ExaminationParameterMaster/DeleteExaminationParameterMaster?id=` + id;
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
export default DeleteExaminationParameterMaster