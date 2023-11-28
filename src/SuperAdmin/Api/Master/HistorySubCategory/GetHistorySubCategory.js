async function GetHistorySubCategory(data) {
    let url = window.AppbaseUrl+"/api/HistorySubCategory/GetAllHistorySubCategoryMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetHistorySubCategory;