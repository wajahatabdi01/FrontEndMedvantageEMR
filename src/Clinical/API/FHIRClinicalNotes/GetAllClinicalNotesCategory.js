async function GetAllClinicalNotesCategory() {
    // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetClinicalNotesFormListByUHID";
    let url = window.AppbaseUrlNew + "/api/ClinicalNotesCategoryAndTypeMaster/GetAllClinicalNotesCategory";
    let head = { "Content-Type": "application/JSON", accept: "*/*" }
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);
    return response;
}
export default GetAllClinicalNotesCategory;