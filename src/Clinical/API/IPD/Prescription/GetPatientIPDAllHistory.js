async function GetPatientIPDAllHistory(uhid, pmId="") {
    let department  = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId

    let url = ""
    if (pmId === "") {

      url = window.AppbaseUrl + `/api/PatientIPDPrescription/PatientIPDAllHistory?UhId=${uhid}&DeptId=${department}&UserId=${window.userId}&clientId=${window.clientId}`;

    }
    else {
        url = window.AppbaseUrl + `/api/PatientIPDPrescription/PatientIPDAllHistory?UhId=${uhid}&DeptId=${department}&UserId=${window.userId}&PmId=${pmId}&clientId=${window.clientId}`;

    }
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let data ={}
    let response =
      await fetch(url, {
        method: 'GET',
        headers: head,
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default GetPatientIPDAllHistory;