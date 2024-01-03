function DemographyPatientPriviousNamesValidation(previousNamePrefix = "",previousNameFirst = "",previousNameMiddle = "",previousNameLast = "",previousNameSuffix = "",previousNameEndDate = "") {
    if (previousNamePrefix !== "" && previousNamePrefix.trim().length !== 0 && previousNameFirst !== "" && previousNameMiddle !== "" && previousNameLast !== "" && previousNameSuffix !== "" && previousNameEndDate !== "" ) {
        return [true, ""]
    }
    else if (previousNamePrefix === "" || previousNamePrefix.trim().length === 0) {
        return [false, "Please Enter Prefix"]
    }
    else if (previousNameFirst === "") {
        return [false, "Please Select First Name"]
    }
    else if (previousNameMiddle === "") {
        return [false, "Please Select Middle Name"]
    }
    else if (previousNameLast === "") {
        return [false, "Please Select Last Name"]
    }
    else if (previousNameSuffix === "") {
        return [false, "Please Select Suffix"]
    }
   
    else if (previousNameEndDate === "" ) {
        return [false, "Please Enter End Date"]
    }
}
export default DemographyPatientPriviousNamesValidation;