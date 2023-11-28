let GetRecipeSub = async (recipeMainObj)=>{
    
    let url = window.DietservicesUrl + '/api/RecipeMaster/GetRecipeSubList';
    let head= {"content-type": "application/json",'accept' : '*/*'}
    let data ={};
    let response = await fetch (url,{
        method :'POST',
        headers:head,
        body:JSON.stringify(recipeMainObj)
    })
    .then((res)=> res.json())
    .then (data);
    return response;
}
export default GetRecipeSub;