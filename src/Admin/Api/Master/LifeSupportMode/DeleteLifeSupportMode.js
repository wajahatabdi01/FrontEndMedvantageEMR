
async function DeleteLifeSupportMode(id) {

    let url = window.AppbaseUrl + `/api/LifeSupportMode/DeleteSupportMode?id=` + id;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
    }
    let data = {};
    let response =
        await fetch(url, {
            method: 'DELETE',
            headers: head,
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(data)


    return response;
}
 export default DeleteLifeSupportMode;

// async function DeleteStatusMaster(id) {

//     let url = window.AppbaseUrl + `/api/StatusMaster/DeleteStatus?Id=` + id;
//     let head = {
//         "Content-Type": "application/JSON",
//         accept: "*/*",
//     };
//     let data = {};
//     let response =
//         await fetch(url, {
//             headers: head,
//             method: "DELETE",
//         }).then((res) => res.json())
//             .then(data)
//     return response;
// }
// export default DeleteStatusMaster






