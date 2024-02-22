async function DeleteRecordDiscloser(id) {
    let url = window.AppbaseUrl + `/api/FHIRRecordDisclosure/DeleteRecordDisclosure?Id=${id}`;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
    }
    let response =
        await fetch(url, {
            method: 'DELETE',
            headers: head,
            body: JSON.stringify()
        })
            .then((res) => res.json())
            .then()


    return response;
}
export default DeleteRecordDiscloser;




