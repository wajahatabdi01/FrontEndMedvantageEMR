
let GetFoodIntakeList = async (UHID,date)=>{
    let url = window.DietservicesUrl + '/api/FoodIntake/GetFoodIntake?Uhid='+UHID +'&fromDate='+date
    let head= {"content-type": "application/json",'accept' : '*/*'}
    let data =[];
    let response = await fetch (url,{
        headers :head,
        method :'GET'
    })
    .then((res)=> res.json())
    .then (data);
    return response;
}
export default GetFoodIntakeList