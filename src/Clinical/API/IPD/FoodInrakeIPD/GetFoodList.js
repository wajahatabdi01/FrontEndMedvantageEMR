let GetFoodList = async () => {
    let url = window.DietservicesUrl+'/api/KnowMedApisForDiet/GetFoodListByPrefixText';
    //let url = 'https://localhost:7299/api/KnowMedApisForDiet/GetFoodListByPrefixText';
    let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
    let data = {};
    let response = await fetch(url, {
      method: 'GET',
      headers: head,
    }).then(res => res.json()).then(data);
    return response;
  }
  export default GetFoodList;