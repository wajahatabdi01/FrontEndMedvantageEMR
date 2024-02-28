// function AdmitPatientValidation(uhId = "", departmentId = "", wardId = "", doctorId = "", bedId = "", paymentType = "" ,cashpayment = "" ,insurancecompany = 0,) {
//     if (uhId !== "" && uhId.trim().length !== 0 && departmentId !== "" && wardId !== "" && doctorId !== "" && bedId !== "" && paymentType !== 0 && cashpayment !== ""  && insurancecompany !== 0) {
//         return [true, ""]
//     }
//     else if (uhId === "" || uhId.trim().length === 0) {
//         return [false, "Please Enter Uhid"]
//     }
//     else if (departmentId === "") {
//         return [false, "Please Select Department"]
//     }
//     else if (doctorId === "") {
//         return [false, "Please Select Doctor"]
//     }
//     else if (wardId === "") {
//         return [false, "Please Select Ward"]
//     }
//     else if (bedId === "") {
//         return [false, "Please Select Bed"]
//     }
//     else if (paymentType == 0 && paymentType !== 2) {
//         return [false, "Please Select Payment Type"]
//     }
//     else if (cashpayment === "" && paymentType !== 2) {
//         return [false, "Please Enter Amount"]
//     }
//     // else if (paymentType === 2) {
//     //     return [false, "Please Select Insurance Company"]
//     // }
//     else if (paymentType === 2 && insurancecompany === 0 ) {
//         return [false, "Please Select Insurance Company"]
//     }
// }
// export default AdmitPatientValidation;

function AdmitPatientValidation(uhId = "", departmentId = "", wardId = "", doctorId = "", bedId = "") {
    if (uhId !== "" && uhId.trim().length !== 0 && departmentId !== "" && wardId !== "" && doctorId !== "" && bedId !== "") {
        return [true, ""]
    }
    else if (uhId === "" || uhId.trim().length === 0) {
        return [false, "Please Enter Uhid"]
    }
    else if (departmentId === "") {
        return [false, "Please Select Department"]
    }
    else if (doctorId === "") {
        return [false, "Please Select Doctor"]
    }
    else if (wardId === "") {
        return [false, "Please Select Ward"]
    }
    else if (bedId === "") {
        return [false, "Please Select Bed"]
    }
}
export default AdmitPatientValidation;