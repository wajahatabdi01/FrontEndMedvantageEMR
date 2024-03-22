

export default function SaveOPDData(data, jsonName) {
    let name = "" + jsonName
    let patientsendData = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
    let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
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
    window.sessionStorage.setItem("patientsendData", JSON.stringify([...temps]))


}

function GetDataPatient(name) {
    let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
    let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
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