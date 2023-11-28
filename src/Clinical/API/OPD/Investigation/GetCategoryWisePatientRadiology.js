async function GetCategoryWisePatientRadiology(objectData) {

    let url = window.RadiologyservicesUrl + `/api/PatientRadiology/GetCategoryWisePatientRadiology?UHID=${objectData.uhid}&categoryID=${objectData.category}`;
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
export default GetCategoryWisePatientRadiology;