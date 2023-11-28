async function GetSubCategoryWisePatientInvestigation(objectData) {

    let url = window.LabServicebaseUrl + `/api/PatientInvestigation/GetSubCategoryWisePatientInvestigation?sampleCollectionMainID=${objectData.subCategoryId}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetSubCategoryWisePatientInvestigation;