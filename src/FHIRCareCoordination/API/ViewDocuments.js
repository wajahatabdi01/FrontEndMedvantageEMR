async function ViewDocument(docId){
    const url = "https://localhost:5001/api/FHIR/DocumentsDetails?documentId=" + docId +"&action=view ";

    const response = await fetch(url, {
        method:'GET',
        // headers: head,
        // body:docId
    })
    .then((res) => res.text())
    .then(docId);

    return response;
}
export default ViewDocument;