async function DeleteHistorycategorydepartmentassignAPI(id) {
    let url = window.AppbaseUrl + "/api/HistoryCategoryDepartmentAssign/DeleteHistoryCategoryDepartment?Id="+id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",

    };
    let data = {};
    let response =
        await fetch(url, {
            headers: head,
            method: "DELETE",
            body:JSON.stringify()
        }).then((res) => res.json()).then(data)
    return response;
}
export default DeleteHistorycategorydepartmentassignAPI;
