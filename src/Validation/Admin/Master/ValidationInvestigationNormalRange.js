function ValidationInvestigationNormalRange(subTestID = "0", genderId = "0", minAge = "", maxAge = "", ageUnitID = "0", ageUnit="",
minValue = "", maxvalue = "", valueUnitID = "0") {
    if (subTestID !== "0" &&  genderId !== "0" && minAge !== ""  && maxAge !== "" 
    && ageUnitID !== "0" && ageUnit !== "" &&  ageUnit.trim().length !== 0 && minValue !== "" 
    && maxvalue !== ""  &&  valueUnitID !== "0") {
        return [true,''];
    }
    else {
        if(subTestID === "0"){
            return [false,'errddlSubTestID', 'Please select SubTest'];
        }
        else if(genderId === "0"){
            return [false,'errddlGenderId', 'Please select Gender'];
        }
        else if(minAge === "" ){
            return [false,'errddlMinAge', 'Please Enter Min Age'];
        }
        else if(maxAge === "" ){
            return [false,'errddlMaxAge', 'Please Enter Max Age'];
        }
        else if(maxAge < minAge ){
            return [false,'errddlMaxAge', 'Max age should be greater than min age'];
        }
        else if(ageUnitID === "0"){
            return [false,'errddlAgeUnitID', 'Please select Age Unit'];
        }
        else if(ageUnit === "" &&  ageUnit.trim().length === 0 ){
            return [false,'errddlAgeUnit', 'Please Enter Age Unit'];
        }
        else if(minValue === "" ){
            return [false,'errddlMinValue', 'Please Enter Min Value'];
        }
        else if(maxvalue === "" ){
            return [false,'errddlMaxvalue', 'Please Enter Max Value'];
        }
        else if(maxvalue < minValue ){
            return [false,'errddlMaxvalue', 'Max val should be greater than min val'];
        }
        else if(valueUnitID === "0"){
            return [false,'errddlValueUnitID', 'Please select Value Unit'];
        }
    }
}
export default ValidationInvestigationNormalRange;