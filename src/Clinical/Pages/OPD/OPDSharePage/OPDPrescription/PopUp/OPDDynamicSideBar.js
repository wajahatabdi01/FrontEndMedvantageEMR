import React, { useEffect, useState } from 'react'
import Heading from '../../../../../../Component/Heading'
import BoxHeading from '../../../../../../Component/BoxHeading'
import SaveOPDData from '../../../../../../Code/SaveOPDData'
import GetExaminationSubCategory from "../../../../../API/OPD/Prescription/GetExaminationSubCategory"
import { useSelector } from 'react-redux'

export default function OPDDynamicSideBar(props) {
    
    let [subCategory, setSubCategory] = useState([])
    let [testName, setTestName] = useState([])
    let [sendData, setSendData] = useState([])
    let [patientExaminationResult, setPatientExaminationResult] = useState([])
    let [disable, setDisable] = useState(0)

    let getdata = async () => {
        let response = await GetExaminationSubCategory(props.id)
        if (response.status === 1) {
            // setSubCategory(response.responseValue)

            let tempparamentername = []
            let checksubCategoryId = (value) => {
                let tr = 0
                let index
                tempparamentername.map((val, ind) => {
                    if (val.subCategoryId === value.subCategoryId) {
                        tr = 1
                        index = ind
                    }
                })
                if (tr !== 0) {
                    return [true, index]
                }
                else {

                    return [false, -1]
                }
            }
            response.responseValue.map((value, index) => {
                let check = checksubCategoryId(value)
                if (check[0]) {
                    tempparamentername[check[1]].repeaterData.push({
                        "examParameterAssignId": value.examParameterAssignId,
                        "parameterId": value.parameterId,
                        "parameterName": value.parameterName,
                        "inspectedAs": value.inspectedAs,
                        "status": value.status
                    })
                }
                else {
                    let t = {
                        subCategoryId: value.subCategoryId,
                        subCategoryName: value.subCategoryName,
                        categoryId: value.categoryId,
                        categoryName: value.categoryName,
                        remark: value.remark,
                        createdDate: value.createdDate,
                        userId: value.userId,
                        repeaterData: [{
                            "examParameterAssignId": value.examParameterAssignId,
                            "parameterId": value.parameterId,
                            "parameterName": value.parameterName,
                            "inspectedAs": value.inspectedAs,
                            "status": value.status
                        }]
                    }
                    tempparamentername.push(t)
                }
            })

            // let tempsetResult = [...tempparamentername]
            // tempparamentername.map((val, ind) => {
            //     val.repeaterData.map((v, i) => {
            //         if (v.subCategoryParameterIdAssignId === v.examParameterAssignId) {

            //         }
            //     })
            // })

            setSubCategory(tempparamentername)
            setData(tempparamentername)


        }
    }

    let handleOnChange = (examParameterAssignId, id, remark) => {

        let flag = 0
        let temp = [...sendData]

        sendData.map((val, ind) => {
            if (val.subCategoryParameterIdAssignId === examParameterAssignId) {
                if (val.parameterValueId === id) {
                    flag = 1
                }
                else {
                    temp.splice(ind, 1)
                }
                return
            }
        })
        if (flag === 0) {
            let jsonExamination = {
                subCategoryParameterIdAssignId: examParameterAssignId,
                parameterValueId: id,
                parameterStatement: remark
            }
            setSendData([...sendData, jsonExamination])
            SaveOPDData([...sendData, jsonExamination], "patientExaminationResult")
        }
    }

    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])

    let setData = (val) => {
        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        let tempGetData = []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    // console.log("Exmination", val)
                    if (key[0] === "patientExaminationResult") {
                        setPatientExaminationResult(val.patientExaminationResult)
                        tempGetData = [...val.patientExaminationResult]
                        setSendData(val.patientExaminationResult)

                    }
                    else if (key[0] === "disable") {
                        setDisable(val.disable)
                    }
                }
            })
        })


        let tempsub = [...val]
        val.map((val, ind) => {
            val.repeaterData.map((va, inn) => {
                va.status.map((vs, ia) => {
                    tempGetData.map((v, i) => {
                        if (v.subCategoryParameterIdAssignId === va.examParameterAssignId && v.parameterValueId === vs.id) {
                            tempsub[ind].repeaterData[inn].status[ia]["checked"] = true
                        }
                        else {
                            if (tempsub[ind].repeaterData[inn].status[ia]["checked"] !== true) {
                                tempsub[ind].repeaterData[inn].status[ia]["checked"] = false
                            }
                        }
                    })
                })

            })

        })
        setSubCategory(tempsub)
        // console.log("Data ", tempsub)

    }

    useEffect(() => {
        getdata()
        setData([])

        // console.log("props", props.categoryType)
    }, [props])

    // useEffect(() => {
    //     SaveOPDData(sendData, "patientExaminationResult")
    // }, [sendData])

    return (
        <>
            <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="allergies" aria-labelledby="allergiesLabel">
                <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                    <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" onClick={() => { props.fun(0) }} aria-label="Close"><i className='fa fa-close ' ></i></div>
                    <h5 className="offcanvas-title text-white" id="allergiesLabel" >{props.name}</h5>
                </div>
                <div className="offcanvas-body " >
                    {subCategory && subCategory.map((val, index) => {

                        return (
                            <>
                                <div className='row'>

                                    <BoxHeading title={val.subCategoryName} />
                                </div>
                                <div className='d-flex  flex-column gap-2 pb-2'>

                                    {subCategory && val.repeaterData.map((val, inde) => {
                                        return (<>
                                            <div className='d-flex flex-column '>
                                                <Heading text={val.parameterName} />
                                                <div className='d-flex flex-row gap-2'>
                                                    {
                                                        val.status && val.status.map((v, i) => {
                                                            return (
                                                                <>
                                                                    <input type='radio' name={val.parameterName} onChange={() => { handleOnChange(val.examParameterAssignId, v.id, v.remark) }} defaultChecked={v.checked} disabled={disable ? true : false} /> {v.remark}
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </>)
                                    })}


                                </div>

                            </>


                        )
                    })}
                </div>


            </div>
            <div className="offcanvas-backdrop fade show" onClick={()=>{ props.fun(0) }}></div>
        </>
    )
}
