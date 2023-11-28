    function ValidationSubtestNormalRange(subTestID = "", machineID = "", gender = "", ageMin = "", ageMax = "", ageUnitID = "", rangeMin = "", rangeMax = "",) {
    if (subTestID !== "0"  && machineID !== "0" && gender !== "0" && ageMin !== "" && ageMin.length !== 0 && ageMax !== "" && ageMax.length !== 0 && ageUnitID !== "0"
        && rangeMin !== "" && rangeMin.length !== 0 && rangeMax !== "" && rangeMax.length !== 0) {
            
       
            return [true, ""]
    }
    else {
        if(subTestID === "0")
        {
            return [false, "errddlSubtest", "Please Select Subtest"]
        }
        else if(machineID === "0")
        {
            return [false, "errddlMachineName", "Please Select Machine"]

        }
        else if(gender === "0")
        {
            return [false, "errddlGender", "Please Select Gender"]

        }
        else if(ageMin === "" || ageMin === null || ageMin === undefined || ageMin.toString().length === 0)
        {
            
            return [false, "errAgeMin", "Please Enter Min Age."]

        }
        else if(ageMax === "" || ageMax === null || ageMax === undefined || ageMax.toString().length === 0)
        {
            return [false, "errAgeMax", "Please Enter Max Age."]

        }
        else if(ageUnitID === "0")
        {
            return [false, "errddlAgeUnit", "Please Select Age Unit."]

        }
        else if(rangeMin === "" || rangeMin === null || rangeMin === undefined || rangeMin.toString().length === 0)
        {
            return [false, "errRangeMin", "Please Enter Min Range."]

        }
        else if(rangeMax === "" || rangeMax === null || rangeMax === undefined || rangeMax.toString().length === 0)
        {
            return [false, "errRangeMax", "Please Enter Max Range."]

        }
    }
}
export default ValidationSubtestNormalRange;