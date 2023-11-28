function ValidationOPDRegistration (ptMob="",identityType='0',identityNo="",ptName="",ptAddress="",state='0',city='0',dob="",age="",gender='0',patientHeight='',patientWeight='',department='0',doctor='0',room='0'){

    if(ptMob.toString().length != 10){
       
        return ['Enter Correct Mobile Number',"errMobile"];
    }
    else if(identityType !== "0" && identityNo ===""){
        return ['Enter Identity Number',"errIdentityNo"];
    }
    else if(identityType === "0" && identityNo !==""){
        return ['Enter Identity Number',"errIdentityType"];
    }
    else if(ptName.trim() === ""){
        return ['Enter Patient Name',"errPatientName"];
    }
    else if(dob === ""){
        return ['Enter DOB',"errPatientDob"];
    }
    else if(age === ""){
        return ['Enter Age',"errPatientAge"];
    }
    
    else if(gender === '0'){
        return ['Select Gender',"errPatientGender"];
    }
    
    else if(patientHeight !=='' && (patientHeight === 0 || patientHeight < 46 || patientHeight > 275)){
        return ['Fill Correct Height',"errPatientHeight"];
    }
    else if(patientWeight !== '' && (patientWeight === 0 || patientWeight < 0.5 || patientWeight > 800)){
        return ['Fill Correct Weight',"errPatientWeight"];
    }
    else if(ptAddress.trim() === ""){
        return ['Enter Address',"errPatientAddress"];
    }
    else if(state === '0'){
        return ['Select State',"errState"];
    }
    else if(city === '0'){
        return ['Select Citye',"errCity"];
    }
    
    // else if(zip === ""){
    //     return ['Enter Zip Code',"errZip"];
    // }
    
    else if(department === '0'){
        return ['Select Department',"errDepartment"];
    }

 
    // else if(ward === '0'){
    //     return ['Select Ward',"errWard"];
    // }
    // else if(bed === '0'){
    //     return ['Select Bed',"errWard"];
    // }
    else if(doctor === '0'){
        return ['Select Doctor',"errDoctor"];
    }
    else if(room === '0'){
        return ['Select Room',"errRoom"];
    }
    
    else{
        return true;
    }
   
}

export default ValidationOPDRegistration;