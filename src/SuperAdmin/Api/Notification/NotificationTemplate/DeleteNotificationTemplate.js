async function DeleteNotificationTemplate(id) {
    let url = window.AdminbaseUrl + `/api/NotificationTemplate/DeleteNotificationTemplate?id=` + id;
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
export default DeleteNotificationTemplate


