
let SaveFoodIntake = async(obj) =>{
    let url = window.DietservicesUrl+'/api/FoodIntake/InsertFoodIntake';
    let head ={'Content-Type':'application/json-patch+json','accept':'*/',};
    let data={};
    let response = await fetch(url,{
        method:'POST',
        headers:head,
        body:JSON.stringify(obj)
    }).then(res => res.json()).then(data);
    return response;
}
export default SaveFoodIntake;