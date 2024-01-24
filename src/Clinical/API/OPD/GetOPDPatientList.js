async function GetOPDPatientList(uhid) {
    let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let activeWard = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
    // let UhId = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let url = window.fhiropenEMR + `/api/AdmittedPatientList/GetOPDPatientVisitDetails?headId=${activeWard}&departmentId=${activeDeaprtment}&UserId=${window.userId}&ClientId=${clientID}`;
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
export default GetOPDPatientList;