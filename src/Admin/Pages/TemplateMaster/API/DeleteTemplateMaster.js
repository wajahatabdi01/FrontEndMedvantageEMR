
async function DeleteTemplateMaster(data) {
    let { id, clientId } = data;
    let url = window.AppbaseUrl + `/api/NotesTemplateMaster/DeleteTemplate?id=${id}&clientId=${clientId}`;
let head = {
    "Content-Type": "application/JSON",
    accept: "*/*"
};

let response =
    await fetch(url, {
        headers: head,
        method: "DELETE",
    }).then((res) => res.json())
        .then(data)
return response;
}
export default DeleteTemplateMaster;


