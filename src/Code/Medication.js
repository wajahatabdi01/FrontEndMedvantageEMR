import GetBrandList from "../Clinical/API/KnowMedsAPI/GetBrandList"
import GetProblemList from "../Clinical/API/KnowMedsAPI/GetProblemList"
import GetFrequncyList from "../Clinical/API/KnowMedsAPI/GetFrequncyList"
import POSTDeleteMedicationRow from "../Clinical/API/OPD/Prescription/POSTDeleteMedicationRow"

let handleDeleteRowCode = async (ind, id, value, drugId, row, drugInteractionId, medicationData, setMedicationData, setShowMeassage, setShowSuccessToster, setShowAlertToster) => {
    try {

        let temp = [...medicationData]
        if (value === 0) {
            console.log("index", ind)
            temp.splice(ind, 1)
            console.log("tempdata", temp)
            if (temp.length !== 0) {
                let druginteraction = drugInteractionId.findIndex(drugInteractionId => drugInteractionId === drugId)
                if (druginteraction !== -1) {
                    drugInteractionId.splice(druginteraction, 1)
                }
                let index = temp.findIndex(temp => temp.id === 0);
                if (index !== -1) {
                    let index = temp.findIndex(temp => temp.drugName === "");
                    console.log("ddsad", index)
                    if (index !== -1) {

                        setMedicationData(temp)
                    }
                    else {

                        setMedicationData([...temp, row])
                    }
                    // let showAdd = temp.length - 1
                    // document.getElementById("addprescription" + showAdd).style.display = "block";
                }
                else {
                    // console.log("showAdd", temp)
                    console.log("ddsad", temp)

                    if (temp.length === 1) {
                        setMedicationData([...temp, row])
                    }
                    else {
                        setMedicationData([...temp, row])

                    }
                }
            }
            else {
                console.log("00lenh")

                setMedicationData([row])
            }
        }
        else {
            let sendData = {
                "id": id,
                "isStop": 0,
                "userId": window.userId
            }
            let response = await POSTDeleteMedicationRow(sendData)
            if (response.status === 1) {
                temp.splice(ind, 1)
                setMedicationData([...temp])
                setShowMeassage("Medicine Delete Successfully!!")
                setShowSuccessToster(1)

            }
            else {
                setShowMeassage(response.responseValue)
                setShowAlertToster(1)
            }

        }

    }
    catch (e) {
        setShowAlertToster(1)
        setShowMeassage(e.message)
    }

}

// let handleChangeCode = (e, ind) => {
//     try {
//         let temp = [...medicationData]
//         let value = e.target.value
//         let name = e.target.name

//         if (e.target.value !== "") {
//             if (name === "drugData") {

//                 temp[ind]["drugId"] = 0
//                 temp[ind]["drugName"] = value
//                 temp[ind]["dosageForm"] = ""
//                 temp[ind]["dosageStrength"] = ""
//                 temp[ind]["doseUnit"] = ""
//                 temp[ind]["isAntibiotic"] = 0

//                 setMedicationData([...temp])

//                 let response = FindByQuery(medicationList, value, "brandName")
//                 if (response.length != 0) {
//                     setMedicationListTemp(response)
//                     setShowSearchBoxMedic(ind)
//                 }
//                 else {
//                     setMedicationListTemp(["No Data Found!", ""])
//                     setShowSearchBoxMedic(-1)

//                 }
//                 let flag = 0
//                 medicationData.map((val, ind) => {
//                     if (val.id === 0 && val.drugId === "") {
//                         flag = 1
//                         return
//                     }
//                 })
//                 if (flag !== 1) {
//                     setMedicationData([...medicationData, row])
//                 }



//             }
//             else if (name === "frequencyData") {
//                 temp[ind]["doseFrequency"] = value
//                 setMedicationData([...temp])

//                 let response = FindByQuery(frequncyList, value, "frequencyName")
//                 if (response.length != 0) {
//                     setFrequncyListTemp(response)
//                     setShowSearchBoxFrequncy(ind)
//                 }
//                 else {
//                     setShowSearchBoxFrequncy(["No Data Found!", ""])
//                     setShowSearchBoxFrequncy(-1)

//                 }
//             }
//             else if (name === "duration") {
//                 temp[ind]["duration"] = value
//                 // console.log("duration ", value)
//                 setMedicationData([...temp])
//             }
//             else if (name === "rationalData") {
//                 temp[ind]["rationalId"] = value
//                 setMedicationData([...temp])
//                 let response = FindByQuery(rationalList, value, "problemName")
//                 if (response.length != 0) {
//                     setRationalListTemp(response)
//                     setShowSearchBoxRational(ind)
//                 }
//                 else {
//                     setShowSearchBoxRational(["No Data Found!", ""])
//                     setShowSearchBoxRational(-1)

//                 }
//             }

//             else if (name === "remark") {
//                 temp[ind]["remark"] = e.target.value
//                 setMedicationData([...temp])

//             }

//         }

//         else {
//             if (name === "drugData") {
//                 temp[ind]["drugId"] = 0
//                 temp[ind]["drugName"] = ""
//                 temp[ind]["dosageForm"] = ""
//                 temp[ind]["dosageStrength"] = ""
//                 temp[ind]["doseUnit"] = ""
//                 temp[ind]["isAntibiotic"] = 0
//                 setMedicationData([...temp])
//             }
//             else if (name === "frequencyData") {
//                 temp[ind]["doseFrequency"] = ""
//                 setMedicationData([...temp])
//                 // temp[ind]["duration"] = value
//             }
//             else if (name === "duration") {
//                 temp[ind]["duration"] = ""

//                 setMedicationData([...temp])
//             }
//             else if (name === "rationalData") {
//                 temp[ind]["rationalId"] = ""
//                 setMedicationData([...temp])

//             }
//             else if (name === "remark") {
//                 temp[ind]["remark"] = ""
//                 setMedicationData([...temp])

//             }
//             setShowSearchBoxMedic(-1)
//             setShowSearchBoxFrequncy(-1)
//             setShowSearchBoxRational(-1)

//         }
//     }
//     catch (e) {
//         setShowAlertToster(1)
//         setShowMeassage(e)
//     }
// }

// let handleClickCode = (name, ind, data) => {

//     try {
//         let temp = [...medicationData]

//         if (name === "drugData") {
//             temp[ind]["drugId"] = data[0]
//             temp[ind]["drugName"] = data[1]
//             temp[ind]["dosageForm"] = data[2]
//             temp[ind]["dosageStrength"] = data[3]
//             temp[ind]["doseUnit"] = data[4]
//             temp[ind]["isAntibiotic"] = data[5]
//             // console.log("isAnitincds", data[5])
//             console.log("currentId", drugInteractionId)
//             setDrugInteractionId([...drugInteractionId, data[0]])
//             // console.log("drug interaction", drugInteractionId)

//             GetDrugInteractionn([...drugInteractionId, data[0]])
//             document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
//             setShowSearchBoxMedic(-1)
//             setMedicationData(temp)



//         }
//         else if (name === "frequencyData") {
//             temp[ind]["doseFrequency"] = data
//             document.getElementById("frequencyData" + ind).value = data

//             setShowSearchBoxFrequncy(-1)
//             setMedicationData(temp)
//         }
//         else if (name === "rationalData") {
//             temp[ind]["rationalId"] = data[0]
//             temp[ind]["problemName"] = data[1]
//             setShowSearchBoxRational(-1)
//             document.getElementById("rationalData" + ind).value = data[1];
//             setMedicationData(temp)
//         }
//     }
//     catch (e) {
//         setShowAlertToster(1)
//         setShowMeassage(e)
//     }




// }

// let handleStopCode = async (ind, id) => {
//     try {
//         let temp = [...medicationData]
//         let sendData = {
//             "id": id,
//             "isStop": 1,
//             "userId": window.userId
//         }
//         let response = await POSTDeleteMedicationRow(sendData)
//         if (response.status === 1) {
//             temp.splice(ind, 1)
//             setMedicationData([...temp])

//             setShowMeassage("Medicine Stop Successfully!!")
//             setShowSuccessToster(1)

//         }
//         else {
//             setShowMeassage(response.responseValue)
//             setShowAlertToster(1)
//         }
//     }
//     catch (e) {
//         setShowAlertToster(1)
//         setShowMeassage(e)
//     }
// }

// let getProblemIdCode = () => {
//     let problemId = []
//     let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
//     let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
//     temp.map((value, index) => {
//         value.map((val, ind) => {
//             if (value[0] === activeUHID) {
//                 let key = Object.keys(val)
//                 if (key[0] === "jsonDiagnosis") {
//                     val.jsonDiagnosis.map((val, ind) => {
//                         if (val != null) {
//                             // setProblemId([...problemId, val.problemId])
//                             problemId.push(val.problemId)

//                         }
//                     })
//                 }
//             }
//         })
//     })
//     return problemId
// }

// export default handleChangeCode

let getMedicationListData = async (setMedicationList, setMedicationListTemp, setFrequncyList, setFrequncyListTemp, setRationalList, setRationalListTemp, setShowAlertToster, setShowMeassage) => {
    try {
        let response = await GetBrandList()
        let freqresponse = await GetFrequncyList()

        let rationalData = await GetProblemList()
        if (response.status === 1) {
            setMedicationList(response.responseValue)
            setMedicationListTemp(response.responseValue)
        }
        if (freqresponse.status === 1) {
            setFrequncyList(freqresponse.responseValue)
            setFrequncyListTemp(freqresponse.responseValue)
        }
        if (rationalData.status === 1) {
            setRationalList(rationalData.responseValue)
            setRationalListTemp(rationalData.responseValue)
        }
    }
    catch (e) {
        setShowAlertToster(1)
        setShowMeassage(e.message)
    }
}
export { handleDeleteRowCode, getMedicationListData }