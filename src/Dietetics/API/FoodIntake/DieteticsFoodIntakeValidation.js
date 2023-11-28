function DieteticsFoodIntakeValidation(txtDate="",time="",food="",Quantity="",unit=""){
console.log(txtDate,time,food,Quantity,unit);
if(txtDate===""){
    return['Select Date','errDate'];
}
else if(time===''){
    return['Select Time','errTime'];
}
else if(food===''){
    return['Select Food','errFood'];
}
else if(Quantity===''){
    return['Enter Quantity','errQuantity'];
}
else if(unit===''){
    return['Please Select Unit','errUnit'];
}
else {
    return true;
}
}
export default DieteticsFoodIntakeValidation;
