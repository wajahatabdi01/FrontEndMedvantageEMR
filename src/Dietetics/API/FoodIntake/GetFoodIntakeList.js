 
    let GetFoodIntakeList = async (UHID,date,entryType )=>{
    let url = window.DietservicesUrl + '/api/FoodIntake/GetFoodIntake?Uhid='+UHID +'&fromDate='+date+'&entryType='+entryType;
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