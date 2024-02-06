async function GetGender(data) {
    let url = window.AdminbaseUrl+ "/api/GenderMaster/GetAllGenderMaster";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetGender;


// let GetGender =async(stateID)=>{
//     let langId = JSON.parse(window.sessionStorage.getItem("languageId")).languageId;
//     const url= window.AppbaseUrl+ `/api/PatientRegistration/GetAllGender?languageId=${langId}`;
//     const head={'content-type':'application/json','accept':'*/*',}
//     let data={};
//     let response= await fetch(url,{
//         method:"GET",
//         header:head,
//     }).then(res=> res.json()).then(data);
//     return response;
// }
// export default GetGender;