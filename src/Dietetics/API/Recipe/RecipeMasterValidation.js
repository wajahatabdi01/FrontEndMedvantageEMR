function RecipeMasterValidation(txtFood="",foodQuantity="",foodUnit=""){
    if(txtFood===""){
        return['Select Food','errFood'];
    }
    else  if(foodQuantity===""){
        return['Enter Quantity','errQuantity'];
    }
    else if(foodUnit===""){
        return['Enter Unit','errUnit'];
    }
    else{
        return true;
    }
}
export default RecipeMasterValidation;