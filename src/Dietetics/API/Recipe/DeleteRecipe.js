let DeleteRecipe =async(delObj)=>{
    let url =window.DietservicesUrl+'/api/RecipeMaster/DeleteRecipeMaster';
    let head= {"content-type": "application/json",'accept' : '*/*'}
    let data ={};
    let response = await fetch (url,{
        method :'POST',
        headers:head,
        body:JSON.stringify(delObj)
    })
        .then((res)=> res.json())
        .then (data);
        return response;
}
export default DeleteRecipe;