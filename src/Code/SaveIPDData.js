

export default function SaveIPDData(data, jsonName) {
    let name = "" + jsonName
    let patientsendData = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
    let activePatient = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid
    let temps = [...patientsendData]
    patientsendData.map((val, ind) => {
        if (val[0] === activePatient) {
            val.map((valuse, index) => {
                if (Object.keys(valuse)[0] === name) {
                    val.splice(index, 1)
                    temps[ind] = [...val, { [name]: data }]
                }
                else {
                    temps[ind] = [...val, { [name]: data }]

                }
            })

        }
        // console.log("patient data", temps)
        // store.dispatch(getPatinetSendData(temps))
        
    })
    window.sessionStorage.setItem("IPDpatientsendData", JSON.stringify([...temps]))


}

function GetDataPatient(name) {
    let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
    let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let retundata = []
    temp.map((value, index) => {
        value.map((val, ind) => {
            if (value[0] === activeUHID) {
                let key = Object.keys(val)
                if (key[0] === name) {
                    retundata = [...val[name]]
                }
            }
        })
    })
    return retundata
}

export {GetDataPatient}