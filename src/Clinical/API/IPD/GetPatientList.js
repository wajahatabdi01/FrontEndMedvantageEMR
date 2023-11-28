async function GetPatientList(uhid) {
    let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId;
    let activeWard = JSON.parse(window.sessionStorage.getItem("activePage")).WardId;
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    // let UhId = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let url = window.AppbaseUrl + `/api/AdmittedPatientList/GetAdmittedPatient?headId=${activeWard}&departmentId=${activeDeaprtment}&UserId=${window.userId}&ClientId=${clientID}`;
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
export default GetPatientList;