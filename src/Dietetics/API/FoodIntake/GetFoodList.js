async function GetFoodList(data) {
    let url = window.DietservicesUrl+"/api/KnowMedApisForDiet/GetFoodListByPrefixText";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
    console.log('resf',response);
  return response;
  }
  
  export default GetFoodList;
