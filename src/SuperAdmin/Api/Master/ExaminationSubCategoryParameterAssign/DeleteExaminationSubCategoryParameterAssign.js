async function DeleteExaminationSubCategoryParameterAssign(id) {

    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + `/api/ExaminationSubCategoryParameterAssign/DeleteExaminationSubCategoryParameterAssign?id=` + id;
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
export default DeleteExaminationSubCategoryParameterAssign