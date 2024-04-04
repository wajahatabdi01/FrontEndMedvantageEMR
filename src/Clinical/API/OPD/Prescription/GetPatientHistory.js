async function GetPatientHistory(PmID = "") {
    let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let UhId = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let userId = JSON.parse(window.sessionStorage.getItem("LoginData")).userId
    let url = ""
    if (PmID === "") {

        // url = window.AppbaseUrl + `/api/PatientPrescription/PatientOPDAllHistory?UhId=${UhId}&DeptId=${activeDeaprtment}&UserId=${userId}`;
        url = window.AppbaseUrlNew + `/api/PatientPrescription/PatientOPDAllHistory?UhId=${UhId}&DeptId=${activeDeaprtment}&UserId=${userId}`;
    }
    else {
        // url = window.AppbaseUrl + `/api/PatientPrescription/PatientOPDAllHistory?UhId=${UhId}&DeptId=${activeDeaprtment}&UserId=${userId}&PmID=${PmID}`;
        url = window.AppbaseUrlNew + `/api/PatientPrescription/PatientOPDAllHistory?UhId=${UhId}&DeptId=${activeDeaprtment}&UserId=${userId}&PmID=${PmID}`;

    }
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
export default GetPatientHistory;