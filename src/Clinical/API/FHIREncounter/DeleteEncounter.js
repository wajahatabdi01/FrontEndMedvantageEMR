async function DeleteEncounter(obj) {
    let url = window.AppbaseUrl + "/api/FHIREncounter/DeleteEncounter?Id=" + obj.Id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",

    };
    let data = {};
    let response =
        await fetch(url, {
            headers: head,
            method: "DELETE",
        }).then((res) => res.json()).then(data)
    return response;
}
export default DeleteEncounter;
