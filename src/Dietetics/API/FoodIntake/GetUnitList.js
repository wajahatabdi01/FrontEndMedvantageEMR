

let   GetUnitList = async(foodId)=>{
    let url = window.DietservicesUrl + '/api/KnowMedApisForDiet/UnitListByFoodId?foodId='+foodId;
    console.log('foodId',url);
    let head = {"Content-Type": "application/JSON", 'accept' : '*/*' }
    let data={};
    let response =await fetch (url,{
        headers:head,
        method:'GET'
    })
    .then ((res)=>res.json())
    .then (data);
    return response;
}
export default GetUnitList;