// async function GetPatientNotes(id, pmID) {
//     let url = window.AppbaseUrl+"/api/PatientNotes/GetAllPatientNotes?pdmID="+id+"&pmID="+pmID;
//   let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
//   let data ={}
//   let response = fetch(url, {
//     headers: head,
//     method : 'GET'
//   })
//     .then((res) => res.json())
//     .then(data);
  
//   return response;
//   }
//   export default GetPatientNotes;
  


  async function GetPatientNotes(id) {
    let url = window.AppbaseUrl+"/api/PatientNotes/GetAllPatientNotes?pdmID="+id;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  let data ={}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetPatientNotes;
  