
let GetRecipeMain = async (UHID)=>{
    let url = window.DietservicesUrl + '/api/RecipeMaster/GetRecipeMainList';
    let head= {"content-type": "application/json",'accept' : '*/*'}
    let data ={};
    let response = await fetch (url,{
        method :'POST',
        headers:head,
        body:JSON.stringify(UHID)
    })
    .then((res)=> res.json())
    .then (data);
    return response;
}
export default GetRecipeMain;