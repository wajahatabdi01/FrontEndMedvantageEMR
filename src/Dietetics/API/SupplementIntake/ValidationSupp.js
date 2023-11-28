 function validationSupp(txtDate="",time="",supplimentName="",quantity="",userId=""){
    console.log(txtDate,time,supplimentName,quantity,userId);
    if(txtDate===""){
        return['Select Date','errDate'];
    }
    else if(time===''){
        return['Select Time','errTime'];
    }
    else if(supplimentName===''){
        return['Select Suppliment','errSuppliment'];
    }
    else if(quantity===''){
        return['Select Quantity','errQuantity'];
    }
    else{
        return true;
    }
 }
 export default validationSupp;