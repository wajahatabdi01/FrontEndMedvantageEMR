
async function GetAllPatientVisitReport (visit,UhID,DepartmentId,PatientName,mobileNo,guardianName,EmailiD,pageSize,data) {

  let url = window.AppbaseUrl +`/api/PatientVisitRevisitReport/GetPatientVisitRevisitReport?UhID=${UhID}&PatientName=${PatientName}&MobileNo=${mobileNo}&guardianName=${guardianName}&EmailID=${EmailiD}&DepartmentId=${DepartmentId}&VisitStatus=${visit}&DepartmentId=${DepartmentId}&DoctorId=50&RoomId=${pageSize}`
  let head = {
    'Content-Type': 'application/JSON',
    accept: '*/*',
  }
  let response =
    await fetch(url, {
      method: 'GET',
      headers: head,
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(data)


  return response;
}
export default GetAllPatientVisitReport;

// From date To date just before Email ID 
// &DateFrom=${Datefrom}&DateTo=${DateTo}&


