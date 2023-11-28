async function GetExaminationMaster(data) {
    let url =
    window.AppbaseUrl+"/api/ExaminationCategory/GetAllExaminationCategoryMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetExaminationMaster;