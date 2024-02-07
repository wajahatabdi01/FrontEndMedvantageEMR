async function GetCheckCrNo(uhid) {
    let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    // let UhId = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    // let url = window.AppbaseUrl + `/api/PatientPrescription/CheckCrNo?UhId=${uhid}&DeptId=${activeDeaprtment}&UserId=${window.userId}`;
    let url = window.AppbaseUrl + `/api/PatientPrescription/CheckCrNo?UhId=${uhid}&DeptId=${activeDeaprtment}&UserId=${window.userId}`;
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
export default GetCheckCrNo;