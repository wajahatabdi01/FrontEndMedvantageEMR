let GetUnitList = async(Id) =>
{
  let url =window.DietservicesUrl+'/api/KnowMedApisForDiet/UnitListByFoodId?foodId='+Id;
  //let url = 'https://localhost:7299/api/KnowMedApisForDiet/UnitListByFoodId?foodId='+Id;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetUnitList;